import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getInstructor } from '../services/instructors'
import { getCourses } from '../services/courses'

export default function InstructorDetailPage() {
  const { instructorId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const id = Number(instructorId)

  const { data: instructor, isLoading } = useQuery({
    queryKey: ['instructor', id],
    queryFn: () => getInstructor(id),
    enabled: !!id,
  })

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  const taughtCourses = courses?.filter((c) => c.instructorId === id) ?? []

  if (isLoading) return <div className="text-gray-500">Loading...</div>
  if (!instructor) return <div className="text-red-600">Instructor not found</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/instructors')} className="text-sm text-blue-600 hover:underline">
        &larr; Back to Instructors
      </button>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{instructor.fullName}</h1>
          {user?.role === 'ADMIN' && (
            <button onClick={() => navigate(`/instructors/${id}/edit`)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium">{instructor.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Employee #</dt>
            <dd className="font-medium">{instructor.employeeNumber}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Courses Taught</h2>
        {taughtCourses.length === 0 ? (
          <p className="text-gray-500 text-sm">No courses assigned.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-gray-600">Code</th>
                <th className="px-3 py-2 font-medium text-gray-600">Title</th>
                <th className="px-3 py-2 font-medium text-gray-600">Level</th>
                <th className="px-3 py-2 font-medium text-gray-600">Term</th>
                <th className="px-3 py-2 font-medium text-gray-600">Seats</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {taughtCourses.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-2 font-mono text-blue-700">{c.code}</td>
                  <td className="px-3 py-2">{c.title}</td>
                  <td className="px-3 py-2">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                      {c.academicLevel.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-3 py-2">{c.term}</td>
                  <td className="px-3 py-2">{c.remainingSeats}/{c.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}