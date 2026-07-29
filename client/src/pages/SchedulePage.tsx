import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMySchedule, drop } from '../services/enrollments'
import { useState } from 'react'

export default function SchedulePage() {
  const queryClient = useQueryClient()
  const [err, setErr] = useState('')

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ['mySchedule'],
    queryFn: getMySchedule,
  })

  const dropMut = useMutation({
    mutationFn: (enrollmentId: number) => drop(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySchedule'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      setErr('')
    },
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Drop failed'
      setErr(msg ?? 'Drop failed')
    },
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {enrollments?.length === 0 && <p className="text-gray-500">No active enrollments.</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Course</th>
              <th className="px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 font-medium text-gray-600">Enrolled</th>
              <th className="px-4 py-3 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {enrollments?.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-blue-700">{e.courseCode}</td>
                <td className="px-4 py-3">{e.courseTitle}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                      e.status === 'ACTIVE'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(e.enrolledAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}