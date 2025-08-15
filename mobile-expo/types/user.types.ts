export type TRole = 'admin' | 'moderator' | 'member';

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};
