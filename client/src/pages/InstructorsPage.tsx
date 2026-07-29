import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getInstructors } from '../services/instructors'

export default function InstructorsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: instructors, isLoading } = useQuery({
    queryKey: ['instructors'],
    queryFn: getInstructors,
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
        {user?.role === 'ADMIN' && (
          <button onClick={() => navigate('/instructors/create')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
            + New Instructor
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
              <th className="px-4 py-3 font-medium text-gray-600">Employee #</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {instructors?.map((i) => (
              <tr
                key={i.id}
                onClick={() => navigate(`/instructors/${i.id}`)}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-3">{i.id}</td>
                <td className="px-4 py-3 font-medium text-blue-700">{i.fullName}</td>
                <td className="px-4 py-3 text-gray-500">{i.email}</td>
                <td className="px-4 py-3">{i.employeeNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}