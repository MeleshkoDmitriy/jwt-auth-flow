import { authAPI, secureStorageService } from '@/services/auth';
import { useAuthStore } from '@/store';
import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log('interceptors.response', error.response?.status);
    console.log('interceptors.response', error.response);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await secureStorageService.getRefreshToken();

        if (!refreshToken) {
          console.log('No refresh token!', refreshToken);
          throw new Error('No refresh token!');
        }

        const { data } = await authAPI.refreshToken(refreshToken);
        console.log('response refreshToken data', data);

        useAuthStore.getState().actions.setAccessToken(data.accessToken);
        await secureStorageService.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = data.accessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().actions.logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
