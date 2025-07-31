import { api } from "../api/api";
import { API_ENDPOINTS } from "../constants/endpoints";
import { TRoleResponse } from "../types/response.types";

export const rolesServices = {
  getModeratorRole: async (): Promise<TRoleResponse> => {
    const response = await api.get(API_ENDPOINTS.ROLES.MODERATOR);
    return response.data;
  },

  getAdminRole: async (): Promise<TRoleResponse> => {
    const response = await api.get(API_ENDPOINTS.ROLES.ADMIN);
    return response.data;
  },
};
