export type TRole = "admin" | "moderator" | "member";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
}

export type TRegisterFormData = {
  name: string;
  email: string;
  password: string;
  role: TRole;
}

export type TLoginFormData = {
  email: string;
  password: string;
}