import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { ROUTES } from "../../constants/routes"
import styles from "./HomePage.module.css"
import buttonStyles from "../../components/shared/buttons.module.css"

export const HomePage = () => {
  const { logout, user } = useAuth()

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        
        <div className={styles.userInfo}>
          <div className={styles.userInfoItem}>
            <span className={styles.label}>Имя пользователя</span>
            <span className={styles.value}>{user?.name}</span>
          </div>
          <div className={styles.userInfoItem}>
            <span className={styles.label}>Роль</span>
            <span className={styles.value}>{user?.role}</span>
          </div>
          <div className={styles.userInfoItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user?.email}</span>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={() => logout()}
            className={buttonStyles.dangerButton}
          >
            Выйти из системы
          </button>
          
          <div className={styles.navigationLinks}>
            <Link to={ROUTES.MODERATOR} className={styles.navLink}>
              Страница модератора
            </Link>
            <Link to={ROUTES.ADMIN} className={styles.navLink}>
              Страница администратора
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}