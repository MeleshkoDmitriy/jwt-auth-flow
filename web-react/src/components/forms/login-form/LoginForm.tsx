import { useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { ROUTES } from '../../../constants/routes'
import { useNavigate } from 'react-router-dom'

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      console.log('Успешный вход')

      navigate(ROUTES.HOME, { replace: true })
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Ошибка входа. Проверьте email и пароль.'
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email'
              }
            })}
            placeholder="Введите ваш email"
            disabled={isSubmitting}
            onFocus={() => clearErrors('email')}
          />
          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов'
              }
            })}
            placeholder="Введите ваш пароль"
            disabled={isSubmitting}
            onFocus={() => clearErrors('password')}
          />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <div>
            <p>{errors.root.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}