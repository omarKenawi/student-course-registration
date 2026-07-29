import api from './api'
import type { RegisterRequest, EnrollmentResponse } from '../types/api'

export const register = (data: RegisterRequest) =>
  api.post<EnrollmentResponse>('/enrollments', data).then((r) => r.data)

export const drop = (id: number) =>
  api.patch<EnrollmentResponse>(`/enrollments/${id}/drop`).then((r) => r.data)

export const getSchedule = (studentId: number) =>
  api.get<EnrollmentResponse[]>(`/students/${studentId}/schedule`).then((r) => r.data)

export const getMySchedule = () =>
  api.get<EnrollmentResponse[]>('/students/me/schedule').then((r) => r.data)

export const getRoster = (courseId: number) =>
  api.get<EnrollmentResponse[]>(`/courses/${courseId}/roster`).then((r) => r.data)