import { Home, User2, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function BottomNavbar() {
  const { user } = useAuth()
  const basePath = user?.role === 'admin' ? '/admin' : '/user'

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2 md:hidden">
      <Link to={`${basePath}/dashboard`}><Home size={24} /></Link>
      <Link to={`${basePath}/profile`}><User2 size={24} /></Link>
      <Link to={`${basePath}/profile/edit`}><Settings size={24} /></Link>
    </nav>
  )
}