import api from '../config/api'
import { API_ENDPOINTS } from '../config/api'

interface RoleResponse {
  data: {
    hasAccess: boolean
  }
  message?: string
}

export const rolesService = {
  getAdminRole: async (): Promise<RoleResponse> => {
    const response = await api.get(API_ENDPOINTS.ROLES.ADMIN)
    return response.data
  },

  getModeratorRole: async (): Promise<RoleResponse> => {
    const response = await api.get(API_ENDPOINTS.ROLES.MODERATOR)
    return response.data
  }
} 