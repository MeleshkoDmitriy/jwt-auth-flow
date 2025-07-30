export const BASE_URL = 'http://localhost:5000/api/v1/'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    REFRESH_TOKEN: 'auth/refresh-token',
    LOGOUT: 'auth/logout',
  },
  USERS: {
    CURRENT: 'users/current',
  },
  ROLES: {
    ADMIN: 'roles/admin',
    MODERATOR: 'roles/moderator',
  },
} as const