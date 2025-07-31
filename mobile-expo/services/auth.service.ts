import { api } from "../api/api";
import { API_ENDPOINTS } from "../constants/endpoints";
import { TAuthResponse } from "../types/response.types";
import { TLoginFormData, TRegisterFormData } from "../types/form.types";
import { TStorageKeys } from "../types/storage.types";

export const authServices = {
  register: async (data: TRegisterFormData): Promise<TAuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  login: async (data: TLoginFormData): Promise<TAuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  refreshToken: async (refreshToken: Extract<TStorageKeys, "refreshToken">) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.get(API_ENDPOINTS.AUTH.LOGOUT)
  },
};
