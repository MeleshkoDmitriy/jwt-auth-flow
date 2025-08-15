import { API_ENDPOINTS } from "@/constants/endpoints"
import { apiClient } from "@/lib/axios"
import { AuthRoleResponse, TRoleAccess } from "@/types"


export const rolesAPI = {
  // getAdminRole: async (): Promise<AuthRoleResponse> => {
  //   const response = await apiClient.get(API_ENDPOINTS.ROLES.ADMIN)
  //   return response.data
  // },
  // getModeratorRole: async (): Promise<AuthRoleResponse> => {
  //   const response = await apiClient.get(API_ENDPOINTS.ROLES.MODERATOR)
  //   return response.data
  // },
  getRoleAccess: async (role: TRoleAccess): Promise<AuthRoleResponse> => {
    const endpoint = role === 'admin' ? API_ENDPOINTS.ROLES.ADMIN : API_ENDPOINTS.ROLES.MODERATOR;
    const response = await apiClient.get(endpoint);
    return response.data;
  }
}