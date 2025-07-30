import { type PropsWithChildren, useEffect } from "react";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return children;
};
