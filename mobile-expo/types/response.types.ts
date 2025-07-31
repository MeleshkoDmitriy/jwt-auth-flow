import { TUser } from "./form.types";

export type TAuthResponse = {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: TUser
  }
}

export type TRoleResponse = {
  message: string,
  data: {
    hasAccess: boolean;
  }
}

export type TCurrentUserResponse = {
  user: TUser
}