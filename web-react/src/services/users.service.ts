import api from '../config/api'
import { API_ENDPOINTS } from '../constants/endpoints'
import type { TUser } from '../types/types'

export const usersService = {
  getCurrentUser: async (): Promise<{ data: { user: TUser } }> => {
    const response = await api.get(API_ENDPOINTS.USERS.CURRENT)
    return response.data
  }
} 