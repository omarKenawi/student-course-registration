import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { createCourse } from '../services/courses'
import { getInstructors } from '../services/instructors'
import type { AcademicLevel, Term } from '../types/api'

const levels: AcademicLevel[] = ['FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR']
const terms: Term[] = ['FALL', 'SPRING', 'SUMMER']

export default function CreateCoursePage() {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [form, setForm] = useState({
    code: '', title: '', description: '', creditHours: '', capacity: '',
    term: '', academicYear: '', academicLevel: '', instructorId: '',
  })

  const { data: instructors } = useQuery({ queryKey: ['instructors'], queryFn: getInstructors })

  const mut = useMutation({
    mutationFn: () =>
      createCourse({
        code: form.code,
        title: form.title,
        description: form.description || undefined,
        creditHours: Number(form.creditHours),
        capacity: Number(form.capacity),
        term: form.term as Term,
        academicYear: Number(form.academicYear),
        academicLevel: form.academicLevel as AcademicLevel,
        instructorId: Number(form.instructorId),
      }),
    onSuccess: () => navigate('/courses'),
    onError: (e: unknown) => {
      const msg =
        e instanceof Object && 'response' in e
          ? (e as { response: { data: { message?: string } } }).response?.data?.message
          : 'Failed to create course'
      setErr(msg ?? 'Failed')
    },
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Create Course</h1>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <form onSubmit={(e) => { e.preventDefault(); mut.mutate() }} className="bg-white border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input value={form.code} onChange={set('code')} required className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Credit Hours</label>
            <input type="number" min={1} value={form.creditHours} onChange={set('creditHours')} required className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input value={form.title} onChange={set('title')} required className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input value={form.description} onChange={set('description')} className="w-full border rounded-md px-3 py-2 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input type="number" min={1} value={form.capacity} onChange={set('capacity')} required className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Academic Year</label>
            <input type="number" min={2024} value={form.academicYear} onChange={set('academicYear')} required className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Term</label>
            <select value={form.term} onChange={set('term')} required className="w-full border rounded-md px-3 py-2 text-sm">
              <option value="">-- Select --</option>
              {terms.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select value={form.academicLevel} onChange={set('academicLevel')} required className="w-full border rounded-md px-3 py-2 text-sm">
              <option value="">-- Select --</option>
              {levels.map((l) => <option key={l} value={l}>{l.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instructor</label>
          <select value={form.instructorId} onChange={set('instructorId')} required className="w-full border rounded-md px-3 py-2 text-sm">
            <option value="">-- Select --</option>
            {instructors?.map((i) => <option key={i.id} value={i.id}>{i.fullName}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={mut.isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
            {mut.isPending ? '...' : 'Create'}
          </button>
          <button type="button" onClick={() => navigate('/courses')} className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}