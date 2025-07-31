import { api } from "../api/api";
import { API_ENDPOINTS } from "../constants/endpoints";

export const usersServices = {
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.USERS.CURRENT);
    return response.data;
  },
};
