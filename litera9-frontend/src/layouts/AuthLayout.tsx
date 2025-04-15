import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

// AuthLayout
export default function AuthLayout() {
  const location = useLocation();

  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }, [location]);

  // Menambahkan tipe untuk path
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-blue-100 to-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4 text-sm">
          {/* Menambahkan tipe pada komponen NavLink */}
          <NavLink to="/" icon="home" label="Home" active={isActive('/')} />
          <NavLink to="/register" icon="user-plus" label="Register" active={isActive('/register')} />
          <NavLink to="/login" icon="log-in" label="Login" active={isActive('/login')} />
        </div>

        {/* Icon tambahan di kanan navbar */}
        <div className="flex items-center gap-2">
          <i data-feather="user" className="w-4 h-4 text-gray-700"></i>
        </div>
      </nav>

      {/* Content Area */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full h-full max-w-md p-4 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// Komponen NavLink dengan interaktivitas
type NavLinkProps = {
  to: string;
  icon: string;  // Menentukan tipe untuk icon, bisa berupa nama icon string
  label: string;
  active: boolean;
};

function NavLink({ to, icon, label, active }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center gap-1 font-medium transition-colors duration-200',
        active ? 'text-indigo-700' : 'text-indigo-500 hover:text-indigo-700'
      )}
    >
      <i data-feather={icon} className="w-4 h-4"></i> {label}
    </Link>
  );
}