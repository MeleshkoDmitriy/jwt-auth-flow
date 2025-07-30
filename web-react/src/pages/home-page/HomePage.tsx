import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { ROUTES } from "../../constants/routes"

export const HomePage = () => {
  const { logout, user } = useAuth()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Home</h1>
      <p>User: {user?.name}</p>
      <p>Role: {user?.role}</p>
      <p>Email: {user?.email}</p>
      <button onClick={() => {
        logout()
      }}>Logout</button>
      <Link to={ROUTES.MODERATOR}>Moderator Page</Link>
      <Link to={ROUTES.ADMIN}>Admin Page</Link>
    </div>
  )
}