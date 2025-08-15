export type TRole = 'admin' | 'moderator' | 'member';
export type TRoleAccess = Exclude<TRole, 'member'>;

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};

