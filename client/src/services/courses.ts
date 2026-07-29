import api from './api'
import type { CourseResponse, CreateCourseRequest, UpdateCourseRequest } from '../types/api'

export const getCourses = () =>
  api.get<CourseResponse[]>('/courses').then((r) => r.data)

export const getCourse = (id: number) =>
  api.get<CourseResponse>(`/courses/${id}`).then((r) => r.data)

export const createCourse = (data: CreateCourseRequest) =>
  api.post<CourseResponse>('/courses', data).then((r) => r.data)

export const updateCourse = (id: number, data: UpdateCourseRequest) =>
  api.put<CourseResponse>(`/courses/${id}`, data).then((r) => r.data)