import { type PropsWithChildren, useEffect } from "react";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
      logout();
    }
  }, [isAuthenticated, user, isLoading, navigate, logout]);

  return children;
};
