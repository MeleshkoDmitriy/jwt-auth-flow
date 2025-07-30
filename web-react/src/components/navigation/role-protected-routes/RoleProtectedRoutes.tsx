import { useEffect, useState } from "react";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { rolesService } from "../../../services";
import type { TRole } from "../../../types/types";

interface RoleProtectedRoutesProps {
  children: React.ReactNode;
  requiredRole: Exclude<TRole, "member">;
}

export const RoleProtectedRoutes = ({
  children,
  requiredRole,
}: RoleProtectedRoutesProps) => {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!isAuthenticated) {
        navigate(ROUTES.LOGIN, { replace: true });
        logout();
        return;
      }

      if (!user) {
        navigate(ROUTES.LOGIN, { replace: true });
        logout();
        return;
      }

      try {
        // Проверяем роль пользователя на сервере
        let response;

        if (requiredRole === "admin") {
          response = await rolesService.getAdminRole();
        } else if (requiredRole === "moderator") {
          response = await rolesService.getModeratorRole();
        }

        if (response && response.data.hasAccess) {
          setIsAuthorized(true);
        } else {
          // Если нет доступа, перенаправляем на домашнюю страницу
          navigate(ROUTES.HOME, { replace: true });
        }
      } catch (error) {
        console.error("Authorization check failed:", error);
        // При ошибке авторизации перенаправляем на login
        navigate(ROUTES.LOGIN, { replace: true });
        logout();
      } finally {
        setIsCheckingRole(false);
      }
    };

    if (!isLoading) {
      checkAuthorization();
    }
  }, [isAuthenticated, user, isLoading, requiredRole, navigate, logout]);

  // Показываем загрузку пока проверяется аутентификация и авторизация
  if (isLoading || isCheckingRole) {
    return <div>Loading...</div>;
  }

  // Если не аутентифицирован или не авторизован, не показываем контент
  if (!isAuthenticated || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
