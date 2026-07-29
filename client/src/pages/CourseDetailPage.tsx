import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getCourse } from '../services/courses'
import { getRoster } from '../services/enrollments'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, instructor } = useAuth()
  const id = Number(courseId)

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourse(id),
    enabled: !!id,
  })

  const canViewRoster =
    user?.role === 'ADMIN' ||
    user?.role === 'REGISTRAR' ||
    (user?.role === 'INSTRUCTOR' && instructor?.id === course?.instructorId)

  const { data: roster } = useQuery({
    queryKey: ['roster', id],
    queryFn: () => getRoster(id),
    enabled: !!id && canViewRoster,
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>
  if (!course) return <div className="text-red-600">Course not found</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/courses')} className="text-sm text-blue-600 hover:underline">
        &larr; Back to Courses
      </button>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{course.code} — {course.title}</h1>
          {(user?.role === 'ADMIN' || user?.role === 'REGISTRAR') && (
            <button onClick={() => navigate(`/courses/${id}/edit`)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Level</dt>
            <dd>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                {course.academicLevel.replace(/_/g, ' ')}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Term</dt>
            <dd className="font-medium">{course.term} {course.academicYear}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Credit Hours</dt>
            <dd className="font-medium">{course.creditHours}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Seats</dt>
            <dd className="font-medium">{course.remainingSeats} / {course.capacity}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Instructor</dt>
            <dd>
              {user?.role === 'STUDENT' ? (
                <span className="font-medium">{course.instructorName}</span>
              ) : (
                <button
                  onClick={() => navigate(`/instructors/${course.instructorId}`)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {course.instructorName}
                </button>
              )}
            </dd>
          </div>
          {course.description && (
            <div className="col-span-2">
              <dt className="text-gray-500">Description</dt>
              <dd className="font-medium mt-1">{course.description}</dd>
            </div>
          )}
        </dl>
      </div>

      {canViewRoster && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Enrolled Students ({roster?.length ?? 0})
          </h2>
          {!roster || roster.length === 0 ? (
            <p className="text-gray-500 text-sm">No students enrolled.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium text-gray-600">Student</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Status</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {roster.map((e) => (
                  <tr key={e.id}>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => navigate(`/students/${e.studentId}`)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {e.studentName}
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        e.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{new Date(e.enrolledAt).toLocaleDateString()}</td>
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