import api from './api'
import type { CreateRegistrarRequest, LoginRequest, LoginResponse, UserResponse } from '../types/api'

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>('/auth/login', data).then((r) => r.data)

export const getMe = () =>
  api.get<UserResponse>('/auth/me').then((r) => r.data)

export const createRegistrar = (data: CreateRegistrarRequest) =>
  api.post<UserResponse>('/users/registrars', data).then((r) => r.data)