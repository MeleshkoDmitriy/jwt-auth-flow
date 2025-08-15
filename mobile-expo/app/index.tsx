import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthActions, useAuthStore } from '@/store';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  const { initializeAuth } = useAuthActions();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
