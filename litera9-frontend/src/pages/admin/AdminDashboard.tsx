import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layout/DashboardLayout'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold">Dashboard Admin</h1>
      <p>Selamat datang, {user?.email}</p>
    </DashboardLayout>
  )
}