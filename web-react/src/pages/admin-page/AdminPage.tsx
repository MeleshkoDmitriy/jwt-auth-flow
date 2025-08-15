import { useAuth } from "../../hooks/useAuth"
import styles from "./AdminPage.module.css"
import buttonStyles from "../../components/shared/buttons.module.css"

export const AdminPage = () => {
  const { logout, user } = useAuth()
  
  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <div className={styles.adminBadge}>Администратор</div>
        <h1 className={styles.title}>Панель администратора</h1>
        
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
            className={buttonStyles.primaryButton}
          >
            Выйти из системы
          </button>
        </div>
        
        <div className={styles.adminFeatures}>
          <div className={styles.featuresTitle}>Доступные функции:</div>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>Управление пользователями</li>
            <li className={styles.featureItem}>Настройка системы</li>
            <li className={styles.featureItem}>Просмотр логов</li>
            <li className={styles.featureItem}>Управление ролями</li>
          </ul>
        </div>
      </div>
    </div>
  )
}