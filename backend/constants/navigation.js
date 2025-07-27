export const API_VERSIONS = {
  V1: '/api/v1',
  V2: '/api/v2',
  V3: '/api/v3',
};

export const CURRENT_API_VERSION = API_VERSIONS.V1;

export const BASE_ROUTES = {
  AUTH: '/auth',
  USERS: '/users',
  ROLES: '/roles',
  HEALTH: '/',
};

export const API_ROUTES = {
  AUTH: {
    BASE: `${CURRENT_API_VERSION}${BASE_ROUTES.AUTH}`,
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh-token',
  },
  
  USERS: {
    BASE: `${CURRENT_API_VERSION}${BASE_ROUTES.USERS}`,
    CURRENT: '/current',
  },
  
  ROLES: {
    BASE: `${CURRENT_API_VERSION}${BASE_ROUTES.ROLES}`,
    ADMIN: '/admin',
    MODERATOR: '/moderator',
  },
};

export const FULL_ROUTES = {
  AUTH_REGISTER: `${API_ROUTES.AUTH.BASE}${API_ROUTES.AUTH.REGISTER}`,
  AUTH_LOGIN: `${API_ROUTES.AUTH.BASE}${API_ROUTES.AUTH.LOGIN}`,
  AUTH_LOGOUT: `${API_ROUTES.AUTH.BASE}${API_ROUTES.AUTH.LOGOUT}`,
  AUTH_REFRESH: `${API_ROUTES.AUTH.BASE}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
  USERS_CURRENT: `${API_ROUTES.USERS.BASE}${API_ROUTES.USERS.CURRENT}`,
  ROLES_ADMIN: `${API_ROUTES.ROLES.BASE}${API_ROUTES.ROLES.ADMIN}`,
  ROLES_MODERATOR: `${API_ROUTES.ROLES.BASE}${API_ROUTES.ROLES.MODERATOR}`,
};

export const getRouteWithVersion = (baseRoute, version = CURRENT_API_VERSION) => {
  return `${version}${baseRoute}`;
};

export const getAllVersions = (baseRoute) => {
  return Object.values(API_VERSIONS).map(version => `${version}${baseRoute}`);
};

export const isVersionSupported = (version) => {
  return Object.values(API_VERSIONS).includes(version);
};