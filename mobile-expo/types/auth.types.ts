import { TRole, TUser } from './user.types';

export type TLoginCredentials = {
  email: string;
  password: string;
};

export type TRegisterData = {
  name: string;
  role: TRole;
} & TLoginCredentials;

export interface AuthLoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  };
}

export interface AuthRegisterResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  };
}

export interface AuthRefreshResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthRoleResponse {
  message: string;
  data: {
    hasAccess: boolean;
  };
}

export interface AuthCurrentUserResponse {
  user: TUser;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: AuthError[];
}
