import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Props = {
  allowedRoles: ('user' | 'admin')[]
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />

  return <Outlet />
}