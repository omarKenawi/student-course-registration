import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getMe } from '../services/auth'
import { getCurrentStudent } from '../services/students'
import { getCurrentInstructor } from '../services/instructors'
import type { InstructorResponse, StudentResponse, UserResponse } from '../types/api'

interface AuthContextType {
  user: UserResponse | null
  student: StudentResponse | null
  instructor: InstructorResponse | null
  setUser: (user: UserResponse | null) => void
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [student, setStudent] = useState<StudentResponse | null>(null)
  const [instructor, setInstructor] = useState<InstructorResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe()
        .then((u) => {
          setUser(u)
          if (u.role === 'STUDENT') {
            getCurrentStudent().then(setStudent).catch(() => {})
          } else if (u.role === 'INSTRUCTOR') {
            getCurrentInstructor().then(setInstructor).catch(() => {})
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setStudent(null)
    setInstructor(null)
  }

  return (
    <AuthContext.Provider value={{ user, student, instructor, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}