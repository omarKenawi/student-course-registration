import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createStudent } from '../services/students'
import type { AcademicLevel } from '../types/api'

const levels: AcademicLevel[] = ['FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR']

export default function CreateStudentPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', studentNumber: '', academicLevel: '' })
  const [err, setErr] = useState('')

  const mut = useMutation({
    mutationFn: () =>
      createStudent({
        ...form,
        academicLevel: form.academicLevel as AcademicLevel,
      }),
    onSuccess: () => navigate('/students'),
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Failed to create student'
      setErr(msg ?? 'Failed')
    },
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Create Student</h1>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <form onSubmit={(e) => { e.preventDefault(); mut.mutate() }} className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input value={form.fullName} onChange={set('fullName')} required className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={form.email} onChange={set('email')} required className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={form.password} onChange={set('password')} required minLength={8} className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Number</label>
          <input value={form.studentNumber} onChange={set('studentNumber')} required className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Level</label>
          <select value={form.academicLevel} onChange={set('academicLevel')} required className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="">-- Select --</option>
            {levels.map((l) => <option key={l} value={l}>{l.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={mut.isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
            {mut.isPending ? '...' : 'Create'}
          </button>
          <button type="button" onClick={() => navigate('/students')} className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}