import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCourses } from '../services/courses'
import { register, getSchedule } from '../services/enrollments'
import { useAuth } from '../context/AuthContext'

export default function CoursesPage() {
  const { user, student } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const { data: courses, isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  const { data: schedule } = useQuery({
    queryKey: ['mySchedule'],
    queryFn: () => getSchedule(student!.id),
    enabled: user?.role === 'STUDENT' && !!student,
  })

  const enrolledCourseIds = new Set(schedule?.map((e) => e.courseId) ?? [])

  const registerMut = useMutation({
    mutationFn: (courseId: number) => register({ studentId: student!.id, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['mySchedule'] })
      setErr('')
    },
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Registration failed'
      setErr(msg ?? 'Registration failed')
    },
  })

  if (loadingCourses) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        {(user?.role === 'ADMIN' || user?.role === 'REGISTRAR') && (
          <button onClick={() => navigate('/courses/create')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
            + New Course
          </button>
        )}
      </div>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Code</th>
              <th className="px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="px-4 py-3 font-medium text-gray-600">Level</th>
              <th className="px-4 py-3 font-medium text-gray-600">Term</th>
              <th className="px-4 py-3 font-medium text-gray-600">Seats</th>
              <th className="px-4 py-3 font-medium text-gray-600">Instructor</th>
              {user?.role === 'STUDENT' && <th className="px-4 py-3 font-medium text-gray-600">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses?.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate(`/courses/${c.id}`)}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-3 font-mono text-blue-700">{c.code}</td>
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                    {c.academicLevel.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">{c.term}</td>
                <td className="px-4 py-3">{c.remainingSeats}/{c.capacity}</td>
                <td className="px-4 py-3">
                  {user?.role === 'STUDENT' ? (
                    <span className="text-gray-500">{c.instructorName}</span>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/instructors/${c.instructorId}`) }}
                      className="text-blue-600 hover:underline"
                    >
                      {c.instructorName}
                    </button>
                  )}
                </td>
                {user?.role === 'STUDENT' && (
                  <td className="px-4 py-3">
                    {enrolledCourseIds.has(c.id) ? (
                      <span className="text-xs text-green-600 font-medium">Enrolled</span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!student) return
                          registerMut.mutate(c.id)
                        }}
                        disabled={registerMut.isPending || !student}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {registerMut.isPending ? '...' : 'Register'}
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}