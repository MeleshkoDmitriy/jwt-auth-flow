import { useAuth } from "../../hooks/useAuth"

export const HomePage = () => {
  const { logout } = useAuth()

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => {
        logout()
      }}>Logout</button>
    </div>
  )
}