import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_ENDPOINTS, BASE_URL } from "../constants/endpoints";

// Callback для обновления токенов в auth-context
let onTokensRefreshed:
  | ((accessToken: string, refreshToken: string) => void)
  | null = null;
let isRefreshing = false;

export const setTokensRefreshCallback = (
  callback: (accessToken: string, refreshToken: string) => void
) => {
  onTokensRefreshed = callback;
};

// Создаем axios instance
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления access token к запросам
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов и refresh token
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;



    // Если ошибка 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      // Если уже идет обновление токенов, ждем
      if (isRefreshing) {

        return new Promise((resolve, reject) => {
          const checkRefreshing = () => {
            if (!isRefreshing) {
              const newAccessToken = localStorage.getItem("accessToken");
              if (newAccessToken) {
                originalRequest.headers.Authorization = newAccessToken;
                resolve(api(originalRequest));
              } else {
                reject(error);
              }
            } else {
              setTimeout(checkRefreshing, 100);
            }
          };
          checkRefreshing();
        });
      }

      try {
        isRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // Нет refresh token, очищаем токены
          clearTokens();
          isRefreshing = false;
          return Promise.reject(error);
        }

        // Запрос на обновление токена
        const { accessToken, refreshToken: newRefreshToken } =
          await refreshTokens();


        // Уведомляем auth-context об обновлении токенов
        if (onTokensRefreshed) {
          onTokensRefreshed(accessToken, newRefreshToken);
        }

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = accessToken;
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        // Ошибка при обновлении токена, очищаем токены
        clearTokens();
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Функции для работы с токенами
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};

// Функция для обновления токенов
export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }


    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
      {
        refreshToken,
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // Сохраняем новые токены
    setTokens(accessToken, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    // Если refresh token недействителен, очищаем токены
    clearTokens();
    throw error;
  }
};

export default api;
