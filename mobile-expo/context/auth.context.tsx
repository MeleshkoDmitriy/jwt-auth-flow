import { createContext, PropsWithChildren, useState } from "react";
import { TUser } from "../types/form.types";

type AuthContextType = {
  user: TUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<TUser | null>(null);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
