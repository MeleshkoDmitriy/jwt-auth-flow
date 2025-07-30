import { useState } from "react";
import { RegisterForm } from "../../components/forms/register-form/RegisterForm";
import { LoginForm } from "../../components/forms/login-form/LoginForm";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);

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
      <div>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
    </>
  );
};
