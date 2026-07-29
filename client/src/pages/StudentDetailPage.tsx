import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getStudent } from '../services/students'
import { getSchedule, register, drop } from '../services/enrollments'
import { getCourses } from '../services/courses'

export default function StudentDetailPage() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, student: myStudent } = useAuth()
  const id = Number(studentId)
  const isAdminOrRegistrar = user?.role === 'ADMIN' || user?.role === 'REGISTRAR'
  const canViewSchedule = isAdminOrRegistrar || user?.role === 'STUDENT'
  const [selectedCourse, setSelectedCourse] = useState('')
  const [regErr, setRegErr] = useState('')

  if (user?.role === 'STUDENT' && myStudent?.id !== id) {
    return <div className="text-red-600">Access denied</div>
  }

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudent(id),
    enabled: !!id,
  })

  const { data: schedule } = useQuery({
    queryKey: ['schedule', studentId],
    queryFn: () => getSchedule(id),
    enabled: !!id && canViewSchedule,
  })

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    enabled: isAdminOrRegistrar,
  })

  const enrolledCourseIds = new Set(schedule?.map((e) => e.courseId) ?? [])

  const availableCourses = (courses ?? []).filter(
    (c) =>
      c.academicLevel === student?.academicLevel &&
      !enrolledCourseIds.has(c.id) &&
      c.remainingSeats > 0,
  )

  const registerMut = useMutation({
    mutationFn: () => register({ studentId: id, courseId: Number(selectedCourse) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule', studentId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      setSelectedCourse('')
      setRegErr('')
    },
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Registration failed'
      setRegErr(msg ?? 'Registration failed')
    },
  })

  const dropMut = useMutation({
    mutationFn: (enrollmentId: number) => drop(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule', studentId] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>
  if (!student) return <div className="text-red-600">Student not found</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/students')} className="text-sm text-blue-600 hover:underline">
        &larr; Back to Students
      </button>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{student.fullName}</h1>
          {user?.role === 'ADMIN' && (
            <button onClick={() => navigate(`/students/${id}/edit`)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Student #</dt>
            <dd className="font-medium">{student.studentNumber}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium">{student.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Academic Level</dt>
            <dd>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                {student.academicLevel.replace(/_/g, ' ')}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {isAdminOrRegistrar && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Register for Course</h2>
          {regErr && <p className="text-sm text-red-600 mb-2">{regErr}</p>}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a course --</option>
                {availableCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.title} ({c.remainingSeats}/{c.capacity})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => registerMut.mutate()}
              disabled={!selectedCourse || registerMut.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {registerMut.isPending ? '...' : 'Register'}
            </button>
          </div>
          {availableCourses.length === 0 && (
            <p className="text-xs text-gray-500 mt-2">No available courses at this level.</p>
          )}
        </div>
      )}

      {canViewSchedule && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Schedule</h2>
          {!schedule || schedule.length === 0 ? (
            <p className="text-gray-500 text-sm">No active enrollments.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium text-gray-600">Course</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Title</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Status</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Enrolled</th>
                  {isAdminOrRegistrar && <th className="px-3 py-2 font-medium text-gray-600">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {schedule.map((e) => (
                  <tr key={e.id}>
                    <td className="px-3 py-2 font-mono text-blue-700">{e.courseCode}</td>
                    <td className="px-3 py-2">{e.courseTitle}</td>
                    <td className="px-3 py-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        e.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                    {isAdminOrRegistrar && (
                      <td className="px-3 py-2">
                        {e.status === 'ACTIVE' && (
                          <button
                            onClick={() => dropMut.mutate(e.id)}
                            disabled={dropMut.isPending}
                            className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            {dropMut.isPending ? '...' : 'Drop'}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}