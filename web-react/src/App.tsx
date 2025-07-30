import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { HomePage } from "./pages/home-page/HomePage";
import { LoginPage } from "./pages/login-page/LoginPage";
import { ProtectedRoutes } from "./components/navigation/protected-routes/ProtectedRoutes";
import { RoleProtectedRoutes } from "./components/navigation/role-protected-routes/RoleProtectedRoutes";
import { AuthProvider } from "./context/auth-context";
import { ModeratorPage } from "./pages/moderator-page/ModeratorPage";
import { AdminPage } from "./pages/admin-page/AdminPage";

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: ROUTES.MODERATOR,
    element: (
      <RoleProtectedRoutes requiredRole="moderator">
        <ModeratorPage />
      </RoleProtectedRoutes>
    ),
  },
  {
    path: ROUTES.ADMIN,
    element: (
      <RoleProtectedRoutes requiredRole="admin">
        <AdminPage />
      </RoleProtectedRoutes>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
