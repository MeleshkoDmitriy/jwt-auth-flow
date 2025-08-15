import { useAuthActions, useAuthStore } from "@/store";
import { TRoleAccess } from "@/types";
import { useEffect, useState } from "react";
import { AccessDeniedScreen, LoadingSpinner } from "@/components";

interface RoleGuardProps {
  requiredRole: TRoleAccess;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard = ({ children, requiredRole, fallback }: RoleGuardProps) => {
  const { user, isCheckingRole, hasAccess } = useAuthStore();
  const { checkRoleAccess } = useAuthActions();
  const [hasChecked, setHasChecked] = useState(false);

  console.log('RoleGuard state:', { user, isCheckingRole, hasAccess });

  useEffect(() => {
    const checkAccess = async () => {
      if (user && !hasChecked) {
        await checkRoleAccess(requiredRole);
        setHasChecked(true);
      } else if (!user) {
        setHasChecked(true);
      }
    };
    
    checkAccess();
  }, [user, requiredRole, hasChecked]);

  if (isCheckingRole || !hasChecked) {
    return <LoadingSpinner message="Checking access rights..." />;
  }
  
  if (!user || !hasAccess[requiredRole]) {
    return <AccessDeniedScreen requiredRole={requiredRole} />;
  }
  
  return <>{children}</>;
};