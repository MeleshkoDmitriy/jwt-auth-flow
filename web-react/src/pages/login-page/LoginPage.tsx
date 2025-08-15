import { useState } from "react";
import { RegisterForm } from "../../components/forms/register-form/RegisterForm";
import { LoginForm } from "../../components/forms/login-form/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { isAuthenticated } = useAuth()

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <button
          onClick={handleSwitchForm}
          className={styles.switchButton}
        >
          {isLogin ? "Регистрация" : "Вход"}
        </button>
        
        {isAuthenticated && (
          <Link to={ROUTES.HOME} className={styles.homeLink}>
            Home Page
          </Link>
        )}
        
        <h1 className={styles.title}>
          {isLogin ? "Вход в систему" : "Регистрация"}
        </h1>
        
        <p className={styles.subtitle}>
          {isLogin 
            ? "Войдите в свой аккаунт для доступа к системе" 
            : "Создайте новый аккаунт для начала работы"
          }
        </p>
        
        <div>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
};
