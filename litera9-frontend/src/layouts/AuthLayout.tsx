import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const location = useLocation();

  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }, [location]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-blue-100 to-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="flex items-center gap-1 text-indigo-600 font-medium">
            <i data-feather="home" className="w-4 h-4"></i> Home
          </Link>
          <Link to="/register" className="flex items-center gap-1 text-indigo-600">
            <i data-feather="user-plus" className="w-4 h-4"></i> Register
          </Link>
          <Link to="/login" className="flex items-center gap-1 text-indigo-600">
            <i data-feather="log-in" className="w-4 h-4"></i> Login
          </Link>
        </div>

        {/* Icon tambahan di kanan navbar */}
        <div className="flex items-center gap-2">
          <i data-feather="user" className="w-4 h-4 text-gray-700"></i>
        </div>
      </nav>

      {/* Full height content minus navbar */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full h-full max-w-md p-4 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}