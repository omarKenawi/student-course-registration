import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const quickLinks: Record<string, { label: string; path: string }[]> = {
  ADMIN: [
    { label: 'View Students', path: '/students' },
    { label: 'View Courses', path: '/courses' },
    { label: 'Create Registrar', path: '/registrars/create' },
  ],
  REGISTRAR: [
    { label: 'View Students', path: '/students' },
    { label: 'View Courses', path: '/courses' },
  ],
  INSTRUCTOR: [
    { label: 'View Students', path: '/students' },
    { label: 'View Courses', path: '/courses' },
  ],
  STUDENT: [
    { label: 'View Courses', path: '/courses' },
    { label: 'My Schedule', path: '/schedule' },
  ],
}

export default function DashboardPage() {
  const { user, student } = useAuth()
  const navigate = useNavigate()
  const links = quickLinks[user?.role ?? ''] ?? []

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, {user?.fullName}
      </h1>

      <div className="bg-white border rounded-lg p-6 max-w-lg">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex">
            <dt className="w-24 text-gray-500">Name</dt>
            <dd className="font-medium">{user?.fullName}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Email</dt>
            <dd className="font-medium">{user?.email}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Role</dt>
            <dd>{user?.role}</dd>
          </div>
          {user?.role === 'STUDENT' && student && (
            <>
              <div className="flex">
                <dt className="w-24 text-gray-500">Student #</dt>
                <dd className="font-medium">{student.studentNumber}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-500">Level</dt>
                <dd>
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                    {student.academicLevel.replace(/_/g, ' ')}
                  </span>
                </dd>
              </div>
            </>
          )}
        </dl>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        {links.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="bg-white border rounded-lg p-4 text-left hover:shadow-md transition text-sm font-medium text-blue-700"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}