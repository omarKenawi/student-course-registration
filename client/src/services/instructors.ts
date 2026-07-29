import api from './api'
import type { CreateInstructorRequest, InstructorResponse, UpdateInstructorRequest } from '../types/api'

export const getInstructors = () =>
  api.get<InstructorResponse[]>('/instructors').then((r) => r.data)

export const getInstructor = (id: number) =>
  api.get<InstructorResponse>(`/instructors/${id}`).then((r) => r.data)

export const getCurrentInstructor = () =>
  api.get<InstructorResponse>('/instructors/me').then((r) => r.data)

export const createInstructor = (data: CreateInstructorRequest) =>
  api.post<InstructorResponse>('/instructors', data).then((r) => r.data)

export const updateInstructor = (id: number, data: UpdateInstructorRequest) =>
  api.put<InstructorResponse>(`/instructors/${id}`, data).then((r) => r.data)