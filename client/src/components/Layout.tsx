import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleLabel: Record<string, string> = {
  ADMIN: 'Admin',
  REGISTRAR: 'Registrar',
  INSTRUCTOR: 'Instructor',
  STUDENT: 'Student',
}

export default function Layout() {
  const { user, logout } = useAuth()

  const navItems = [
    { to: '/', label: 'Dashboard', roles: ['ADMIN', 'REGISTRAR', 'INSTRUCTOR', 'STUDENT'] },
    { to: '/students', label: 'Students', roles: ['ADMIN', 'REGISTRAR', 'INSTRUCTOR'] },
    { to: '/instructors', label: 'Instructors', roles: ['ADMIN', 'REGISTRAR', 'INSTRUCTOR'] },
    { to: '/courses', label: 'Courses', roles: ['ADMIN', 'REGISTRAR', 'INSTRUCTOR', 'STUDENT'] },
    { to: '/schedule', label: 'My Schedule', roles: ['STUDENT'] },
    { to: '/audit-logs', label: 'Audit Logs', roles: ['ADMIN'] },
  ]

  const visible = navItems.filter((n) => n.roles.includes(user?.role ?? ''))

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 bg-white border-r shrink-0 flex flex-col">
        <div className="h-14 flex items-center px-4 border-b font-semibold text-lg text-blue-700">
          Course Registration
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {visible.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="text-sm font-medium text-gray-900">{user?.fullName}</div>
          <div className="text-xs text-gray-500">{user ? roleLabel[user.role] : ''}</div>
          <button
            onClick={logout}
            className="mt-2 text-xs text-red-600 hover:underline"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}