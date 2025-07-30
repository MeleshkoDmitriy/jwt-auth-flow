import { createContext, useState, useEffect, type PropsWithChildren } from 'react'
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '../config/api'
import { authService, usersService } from '../services'
import type { TRole, TUser } from '../types/types'

interface AuthContextType {
  user: TUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: TRole) => Promise<void>
  logout: () => Promise<void>
  updateTokens: (accessToken: string, refreshToken: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export { AuthContext }

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<TUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Проверяем токены при инициализации
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedAccessToken = getAccessToken()
        const storedRefreshToken = getRefreshToken()

        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken)
          setRefreshToken(storedRefreshToken)

          // Получаем информацию о пользователе
          const response = await usersService.getCurrentUser()
          setUser(response.data.user)
        }
      } catch {
        // Если токены недействительны, очищаем их
        clearTokens()
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })

      const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken, user: userData } } = response

      // Сохраняем токены в localStorage и состоянии
      setTokens(newAccessToken, newRefreshToken)
      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)
      setUser(userData)

      console.log(response)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа'
      throw new Error(errorMessage)
    }
  }

  const register = async (name: string, email: string, password: string, role: TRole = 'member') => {
    try {
      const response = await authService.register({ name, email, password, role })

      const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken, user: userData } } = response

      // Сохраняем токены в localStorage и состоянии
      setTokens(newAccessToken, newRefreshToken)
      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)
      setUser(userData)

      console.log(response)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации'
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    try {
      // Отправляем запрос на сервер для logout
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Очищаем токены из localStorage и состояния
      clearTokens()
      setAccessToken(null)
      setRefreshToken(null)
      setUser(null)
    }
  }

  const updateTokens = (newAccessToken: string, newRefreshToken: string) => {
    setTokens(newAccessToken, newRefreshToken)
    setAccessToken(newAccessToken)
    setRefreshToken(newRefreshToken)
  }

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken && !!user,
    isLoading,
    login,
    register,
    logout,
    updateTokens
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

