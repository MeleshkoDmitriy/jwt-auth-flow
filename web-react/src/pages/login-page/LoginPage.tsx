import { useState } from "react";
import { RegisterForm } from "../../components/forms/register-form/RegisterForm";
import { LoginForm } from "../../components/forms/login-form/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { isAuthenticated } = useAuth()

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <button
        onClick={handleSwitchForm}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        {isLogin ? "Регистрация" : "Вход"}
      </button>
      {isAuthenticated && <Link to={ROUTES.HOME} style={{ position: 'absolute', top: '20px', right: '100px', zIndex: 1000 }}>Home Page</Link>}
      <div>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
    </>
  );
};
