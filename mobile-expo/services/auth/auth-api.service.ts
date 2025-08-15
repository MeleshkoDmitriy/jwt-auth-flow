import { API_ENDPOINTS } from '@/constants/endpoints';
import { apiClient } from '@/lib/axios';
import {
  AuthLoginResponse,
  AuthRefreshResponse,
  AuthRegisterResponse,
  TLoginCredentials,
  TRegisterData,
} from '@/types';

export const authAPI = {
  login: async (credentials: TLoginCredentials): Promise<AuthLoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

    return response.data;
  },
  register: async (data: TRegisterData): Promise<AuthRegisterResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);

    return response.data;
  },
  refreshToken: async (refreshToken: string): Promise<AuthRefreshResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });

    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.get(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
