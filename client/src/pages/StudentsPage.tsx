import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getStudents } from '../services/students'

export default function StudentsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        {user?.role === 'ADMIN' && (
          <button onClick={() => navigate('/students/create')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
            + New Student
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 font-medium text-gray-600">Student #</th>
              <th className="px-4 py-3 font-medium text-gray-600">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students?.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(`/students/${s.id}`)}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3 font-medium text-blue-700">{s.fullName}</td>
                <td className="px-4 py-3 text-gray-500">{s.email}</td>
                <td className="px-4 py-3">{s.studentNumber}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                    {s.academicLevel.replace(/_/g, ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}