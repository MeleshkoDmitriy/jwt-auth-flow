import { useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import type { TRole } from '../../../types/types'


interface RegisterFormData {
  name: string
  email: string
  password: string
  role: TRole
}

export const RegisterForm = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.role as TRole)
      console.log('Успешная регистрация')

      navigate(ROUTES.HOME, { replace: true })
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Ошибка регистрации. Попробуйте еще раз.'
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Имя обязательно',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа'
              }
            })}
            placeholder="Введите ваше имя"
            disabled={isSubmitting}
            onFocus={() => clearErrors('name')}
          />
          {errors.name && (
            <p>{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <label htmlFor="role">
            Роль
          </label>
          <select
            id="role"
            {...register('role', {
              required: 'Роль обязательна'
            })}
            disabled={isSubmitting}
            onFocus={() => clearErrors('role')}
          >
            <option value="">Выберите роль</option>
            <option value="member">Участник</option>
            <option value="moderator">Модератор</option>
            <option value="admin">Администратор</option>
          </select>
          {errors.role && (
            <p>{errors.role.message}</p>
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
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}