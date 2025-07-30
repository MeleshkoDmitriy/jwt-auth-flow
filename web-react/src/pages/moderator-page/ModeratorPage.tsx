import { useAuth } from "../../hooks/useAuth"

export const ModeratorPage = () => {
  const { logout, user } = useAuth()
  return (
    <div>
      <h1>Moderator Page!</h1>
      <p>User: {user?.name}</p>
      <p>Role: {user?.role}</p>
      <p>Email: {user?.email}</p>
      <button onClick={() => {
        logout()
      }}>Logout</button>
    </div>
  )
}