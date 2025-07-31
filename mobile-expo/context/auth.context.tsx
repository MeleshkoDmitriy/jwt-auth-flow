import { createContext, PropsWithChildren, useState, useContext } from "react";
import {
  TLoginFormData,
  TRegisterFormData,
  TRole,
  TUser,
} from "../types/form.types";
import { setTokens, clearTokens } from "../utils/storage";
import { authServices } from "../services/auth.service";

type AuthContextType = {
  user: TUser | null;
  login: (data: TLoginFormData) => Promise<void>;
  register: (data: TRegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: TLoginFormData) => {
    setIsLoading(true);
    try {
      console.log('Отправляем данные для входа:', data);
      const response = await authServices.login(data);
      console.log('Ответ сервера при входе:', response);
      
      if (response.data) {
        await setTokens(response.data);
        setUser(response.data.user);
      } else {
        throw new Error('Неверный формат ответа от сервера');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: TRegisterFormData) => {
    setIsLoading(true);
    try {
      console.log('Отправляем данные для регистрации:', data);
      const response = await authServices.register(data);
      console.log('Ответ сервера при регистрации:', response);
      
      if (response.data) {
        await setTokens(response.data);
        setUser(response.data.user);
      } else {
        throw new Error('Неверный формат ответа от сервера');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authServices.logout();
      await clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
