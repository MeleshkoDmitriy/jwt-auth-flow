import api from '../config/api'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { TAuthResponse, TRole } from '../types/types'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: TRole
}

export const authService = {
  login: async (data: LoginData): Promise<TAuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data)
    return response.data
  },

  register: async (data: RegisterData): Promise<TAuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data
  },

  refreshToken: async (refreshToken: string): Promise<TAuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken })
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.get(API_ENDPOINTS.AUTH.LOGOUT)
  }
} 