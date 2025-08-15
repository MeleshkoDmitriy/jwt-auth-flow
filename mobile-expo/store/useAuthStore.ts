import { authAPI } from '@/services/auth';
import { secureStorageService } from './../services/auth/secure-storage.service';
import { TAccessToken, TLoginCredentials, TUser, TRegisterData } from '@/types';
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

interface AuthActions {
  setAccessToken: (token: string) => void;
  setUser: (user: TUser) => void;
  initializeAuth: () => Promise<void>;
  login: (credentials: TLoginCredentials) => Promise<void>;
  register: (data: TRegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & { actions: AuthActions }>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isRefreshing: false,
  error: null,

  actions: {
    setAccessToken: (token: string) => set({ accessToken: token }),
    setUser: (user: TUser) => set({ user }),

    initializeAuth: async () => {
      set({ isLoading: true });
      
      try {
        const refreshToken = await secureStorageService.getRefreshToken();
        
        if (refreshToken) {
          const { data } = await authAPI.refreshToken(refreshToken);
          
          await secureStorageService.setItem('refreshToken', data.refreshToken);
          
          set({ 
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false 
          });
        } else {
          set({ isLoading: false });
        }
        
      } catch (error) {
        await secureStorageService.deleteItem('refreshToken');
        set({ 
          accessToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false 
        });
      }
    },

    login: async (credentials: TLoginCredentials) => {
      set({ isLoading: true, error: null });

      try {
        const { data } = await authAPI.login(credentials);

        await secureStorageService.setItem('refreshToken', data.refreshToken);

        set({
          accessToken: data.accessToken,
          user: data.user,
          isAuthenticated: true,
        });
      } catch (error: any) {
        set({ error: error.message || 'Login failed' });

        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    register: async (data: TRegisterData) => {
      set({ isLoading: true, error: null });

      try {
        const { data: registeredData } = await authAPI.register(data);

        await secureStorageService.setItem('refreshToken', registeredData.refreshToken);

        set({
          accessToken: registeredData.accessToken,
          user: registeredData.user,
          isAuthenticated: true,
        });
      } catch (error: any) {
        set({ error: error.message || 'Registration failed' });

        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      try {
        await authAPI.logout();
      } catch (error: any) {
        console.log('Logout error', error);
      } finally {
        await secureStorageService.deleteItem('refreshToken');

        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      }
    },

    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setRefreshing: (refreshing: boolean) => set({ isRefreshing: refreshing }),
    setError: (error: string) => set({ error }),
    clearError: () => set({ error: null }),
  },
}));

export const useAuthUser = () => useAuthStore((state) => state.user);

export const useAuthAccessToken = () => useAuthStore((state) => state.accessToken);

export const useAuthActions = () => useAuthStore((state) => state.actions);
