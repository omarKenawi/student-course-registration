import api from './api'
import type { CreateStudentRequest, StudentResponse, UpdateStudentRequest } from '../types/api'

export const getStudents = () =>
  api.get<StudentResponse[]>('/students').then((r) => r.data)

export const getStudent = (id: number) =>
  api.get<StudentResponse>(`/students/${id}`).then((r) => r.data)

export const getCurrentStudent = () =>
  api.get<StudentResponse>('/students/me').then((r) => r.data)

export const createStudent = (data: CreateStudentRequest) =>
  api.post<StudentResponse>('/students', data).then((r) => r.data)

export const updateStudent = (id: number, data: UpdateStudentRequest) =>
  api.put<StudentResponse>(`/students/${id}`, data).then((r) => r.data)