import { useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import type { TRole } from '../../../types/types'
import styles from '../forms.module.css'
import buttonStyles from '../../shared/buttons.module.css'

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Имя
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
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
          <p className={styles.error}>{errors.name.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
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
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
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
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role" className={styles.label}>
          Роль
        </label>
        <select
          id="role"
          className={styles.select}
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
          <p className={styles.error}>{errors.role.message}</p>
        )}
      </div>

      {errors.root && (
        <div className={styles.rootError}>
          <p>{errors.root.message}</p>
        </div>
      )}

      <button
        type="submit"
        className={buttonStyles.primaryButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}