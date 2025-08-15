import { ENDPOINTS } from '@/constants';
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
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);

    return response.data;
  },
  register: async (data: TRegisterData): Promise<AuthRegisterResponse> => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, data);

    return response.data;
  },
  refreshToken: async (refreshToken: string): Promise<AuthRefreshResponse> => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });

    return response.data;
  },
  logout: async (): Promise<void> => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    console.log(response);
  },
};
