export type TRole = "member" | "admin" | "moderator";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};

export type TAuthResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  },
  message: string;
};
