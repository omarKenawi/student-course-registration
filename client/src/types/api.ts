export type Role = 'ADMIN' | 'REGISTRAR' | 'INSTRUCTOR' | 'STUDENT'

export type AcademicLevel = 'FIRST_YEAR' | 'SECOND_YEAR' | 'THIRD_YEAR' | 'FOURTH_YEAR'

export type Term = 'FALL' | 'SPRING' | 'SUMMER'

export type EnrollmentStatus = 'ACTIVE' | 'DROPPED'

export type AuditAction = 'CREATE' | 'UPDATE' | 'REGISTER' | 'DROP'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface CreateRegistrarRequest {
  fullName: string
  email: string
  password: string
}

export interface UserResponse {
  id: number
  fullName: string
  email: string
  role: Role
}

export interface StudentResponse {
  id: number
  fullName: string
  email: string
  studentNumber: string
  academicLevel: AcademicLevel
}

export interface CreateStudentRequest {
  fullName: string
  email: string
  password: string
  studentNumber: string
  academicLevel: AcademicLevel
}

export interface UpdateStudentRequest {
  fullName?: string
  email?: string
}

export interface InstructorResponse {
  id: number
  fullName: string
  email: string
  employeeNumber: string
}

export interface CreateInstructorRequest {
  fullName: string
  email: string
  password: string
  employeeNumber: string
}

export interface UpdateInstructorRequest {
  fullName?: string
  email?: string
}

export interface CourseResponse {
  id: number
  code: string
  title: string
  description: string
  creditHours: number
  capacity: number
  remainingSeats: number
  term: Term
  academicYear: number
  academicLevel: AcademicLevel
  instructorId: number
  instructorName: string
}

export interface CreateCourseRequest {
  code: string
  title: string
  description?: string
  creditHours: number
  capacity: number
  term: Term
  academicYear: number
  academicLevel: AcademicLevel
  instructorId: number
}

export interface UpdateCourseRequest {
  code?: string
  title?: string
  description?: string
  creditHours?: number
  capacity?: number
  term?: Term
  academicYear?: number
  academicLevel?: AcademicLevel
  instructorId?: number
}

export interface RegisterRequest {
  studentId: number
  courseId: number
}

export interface EnrollmentResponse {
  id: number
  studentId: number
  studentName: string
  courseId: number
  courseCode: string
  courseTitle: string
  status: EnrollmentStatus
  enrolledAt: string
  droppedAt: string | null
}

export interface AuditLogResponse {
  id: number
  userId: number
  action: AuditAction
  entityType: string
  entityId: number
  loggedAt: string
}

export interface PageResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}