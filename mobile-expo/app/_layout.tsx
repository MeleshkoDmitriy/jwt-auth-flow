import { AuthProvider } from "../context/auth.context";
import { AuthGuard } from "../components/AuthGuard";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  );
}