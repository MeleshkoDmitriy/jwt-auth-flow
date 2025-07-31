import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Slot, useSegments } from "expo-router";
import { useRouter } from "expo-router";
import { getAccessToken } from "../utils/storage";

export function AuthGuard() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await getAccessToken();
        console.log('Проверка авторизации:', { accessToken, user, segments });
        
        if (!accessToken) {
          console.log('Нет токена, перенаправляем на логин');
          router.replace("/auth/login");
        } else if (!user) {
          console.log('Есть токен, но нет пользователя, перенаправляем на логин');
          router.replace("/auth/login");
        } else {
          console.log('Пользователь авторизован');
          const inAuthGroup = segments[0] === "auth";
          if (inAuthGroup) {
            console.log('Перенаправляем с auth на tabs');
            router.replace("/(tabs)");
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, segments]);

  // if (isLoading) {
  //   return null;
  // }

  return <Slot />;
}