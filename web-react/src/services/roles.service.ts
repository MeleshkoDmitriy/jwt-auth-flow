import api from '../config/api'
import { API_ENDPOINTS } from '../config/api'

export const rolesService = {
  getAdminRole: async (): Promise<any> => {
    const response = await api.get(API_ENDPOINTS.ROLES.ADMIN)
    return response.data
  },

  getModeratorRole: async (): Promise<any> => {
    const response = await api.get(API_ENDPOINTS.ROLES.MODERATOR)
    return response.data
  }
} 