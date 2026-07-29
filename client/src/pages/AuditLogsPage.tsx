import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuditLogs } from '../services/auditLogs'

const actionColors: Record<string, string> = {
  CREATE: 'bg-green-50 text-green-700',
  UPDATE: 'bg-blue-50 text-blue-700',
  REGISTER: 'bg-purple-50 text-purple-700',
  DROP: 'bg-red-50 text-red-700',
}

export default function AuditLogsPage() {
  const [page, setPage] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['auditLogs', page],
    queryFn: () => getAuditLogs(page, 20),
  })

  if (isLoading) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">User ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Action</th>
              <th className="px-4 py-3 font-medium text-gray-600">Entity</th>
              <th className="px-4 py-3 font-medium text-gray-600">Entity ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.content.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{log.id}</td>
                <td className="px-4 py-3">{log.userId}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${actionColors[log.action] ?? 'bg-gray-50 text-gray-700'}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3">{log.entityType}</td>
                <td className="px-4 py-3">{log.entityId}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(log.loggedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Page {data.number + 1} of {data.totalPages} ({data.totalElements} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={data.first}
              className="px-3 py-1 border rounded disabled:opacity-30 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data.last}
              className="px-3 py-1 border rounded disabled:opacity-30 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}