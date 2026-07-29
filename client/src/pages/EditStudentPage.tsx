import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getStudent, updateStudent } from '../services/students'

export default function EditStudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const studentId = Number(id)
  const [form, setForm] = useState({ fullName: '', email: '' })
  const [err, setErr] = useState('')

  const { data: student } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
  })

  useEffect(() => {
    if (student) setForm({ fullName: student.fullName, email: student.email })
  }, [student])

  const mut = useMutation({
    mutationFn: () => updateStudent(studentId, form),
    onSuccess: () => navigate(`/students/${studentId}`),
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Failed to update'
      setErr(msg ?? 'Failed')
    },
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <form onSubmit={(e) => { e.preventDefault(); mut.mutate() }} className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input value={form.fullName} onChange={set('fullName')} className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={form.email} onChange={set('email')} className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={mut.isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
            {mut.isPending ? '...' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate(`/students/${studentId}`)} className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  )
}