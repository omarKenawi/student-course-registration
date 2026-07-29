import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import StudentsPage from './pages/StudentsPage'
import CreateStudentPage from './pages/CreateStudentPage'
import EditStudentPage from './pages/EditStudentPage'
import StudentDetailPage from './pages/StudentDetailPage'
import InstructorsPage from './pages/InstructorsPage'
import CreateInstructorPage from './pages/CreateInstructorPage'
import EditInstructorPage from './pages/EditInstructorPage'
import InstructorDetailPage from './pages/InstructorDetailPage'
import CoursesPage from './pages/CoursesPage'
import CreateCoursePage from './pages/CreateCoursePage'
import EditCoursePage from './pages/EditCoursePage'
import CourseDetailPage from './pages/CourseDetailPage'
import SchedulePage from './pages/SchedulePage'
import AuditLogsPage from './pages/AuditLogsPage'
import CreateRegistrarPage from './pages/CreateRegistrarPage'
import type { Role } from './types/api'

const queryClient = new QueryClient()

const admin: Role[] = ['ADMIN']
const adminRegistrar: Role[] = ['ADMIN', 'REGISTRAR']
const staff: Role[] = ['ADMIN', 'REGISTRAR', 'INSTRUCTOR']
const student: Role[] = ['STUDENT']
const everyone: Role[] = ['ADMIN', 'REGISTRAR', 'INSTRUCTOR', 'STUDENT']

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute roles={everyone}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route
                path="students"
                element={
                  <ProtectedRoute roles={staff}>
                    <StudentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="students/create"
                element={
                  <ProtectedRoute roles={admin}>
                    <CreateStudentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="students/:id/edit"
                element={
                  <ProtectedRoute roles={admin}>
                    <EditStudentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="students/:studentId"
                element={
                  <ProtectedRoute roles={everyone}>
                    <StudentDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses"
                element={
                  <ProtectedRoute roles={everyone}>
                    <CoursesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/create"
                element={
                  <ProtectedRoute roles={adminRegistrar}>
                    <CreateCoursePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:id/edit"
                element={
                  <ProtectedRoute roles={adminRegistrar}>
                    <EditCoursePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:courseId"
                element={
                  <ProtectedRoute roles={everyone}>
                    <CourseDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="instructors"
                element={
                  <ProtectedRoute roles={staff}>
                    <InstructorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="instructors/create"
                element={
                  <ProtectedRoute roles={admin}>
                    <CreateInstructorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="instructors/:id/edit"
                element={
                  <ProtectedRoute roles={admin}>
                    <EditInstructorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="instructors/:instructorId"
                element={
                  <ProtectedRoute roles={everyone}>
                    <InstructorDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="schedule"
                element={
                  <ProtectedRoute roles={student}>
                    <SchedulePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="audit-logs"
                element={
                  <ProtectedRoute roles={admin}>
                    <AuditLogsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="registrars/create"
                element={
                  <ProtectedRoute roles={admin}>
                    <CreateRegistrarPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}