import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_ENDPOINTS, BASE_URL } from "../constants/endpoints";
import { getToken, setTokens } from "../utils/storage";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async(config: InternalAxiosRequestConfig<any>) => {
  const accessToken = await getToken('accessToken')

  if(accessToken && config.headers) {
    config.headers.Authorization = accessToken
  }

  return config;
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((response: AxiosResponse) => {
  console.log('Успешный ответ от API:', response.status, response.config.url);
  return response;
}, async (error) => {
  console.log('Ошибка от API:', error.response?.status, error.response?.data, error.config?.url);
  
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = await getToken('refreshToken')

    if (refreshToken) {
      try {
        const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
          refreshToken: refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        await setTokens({accessToken, refreshToken: newRefreshToken})

        originalRequest.headers.Authorization = accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  }

  return Promise.reject(error);
})