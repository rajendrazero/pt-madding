import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavbar from '../components/BottomNavbar';

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">pt-madding</Link>
        <div className="flex gap-4 items-center text-sm">
          <span>{user?.role}</span>
          <button onClick={logout} className="text-red-500">Logout</button>
        </div>
      </header>

      <main className="p-4 pb-16">
        {children}
      </main>

      <BottomNavbar />
    </div>
  );
}