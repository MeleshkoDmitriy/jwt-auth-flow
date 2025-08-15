import { useAuth } from "../../hooks/useAuth"
import styles from "./ModeratorPage.module.css"
import buttonStyles from "../../components/shared/buttons.module.css"

export const ModeratorPage = () => {
  const { logout, user } = useAuth()
  
  return (
    <div className={styles.moderatorPage}>
      <div className={styles.container}>
        <div className={styles.moderatorBadge}>Модератор</div>
        <h1 className={styles.title}>Панель модератора</h1>
        
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
        
        <div className={styles.moderatorFeatures}>
          <div className={styles.featuresTitle}>Доступные функции:</div>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>Модерация контента</li>
            <li className={styles.featureItem}>Управление комментариями</li>
            <li className={styles.featureItem}>Проверка пользователей</li>
            <li className={styles.featureItem}>Управление жалобами</li>
          </ul>
        </div>
        
        <div className={styles.moderatorStats}>
          <div className={styles.statsTitle}>Статистика модерации:</div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24</div>
              <div className={styles.statLabel}>Обработано сегодня</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>156</div>
              <div className={styles.statLabel}>За неделю</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}