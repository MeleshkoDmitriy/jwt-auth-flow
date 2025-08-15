import { useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { ROUTES } from '../../../constants/routes'
import { useNavigate } from 'react-router-dom'
import styles from '../forms.module.css'
import buttonStyles from '../../shared/buttons.module.css'

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  )
}