export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    CURRENT: '/users/current',
  },
  ROLES: {
    ADMIN: '/roles/admin',
    MODERATOR: '/roles/moderator',
  },
} as const