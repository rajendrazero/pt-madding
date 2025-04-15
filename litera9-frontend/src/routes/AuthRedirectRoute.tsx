import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type AuthRedirectRouteProps = {
  children: ReactNode;
};

const AuthRedirectRoute = ({ children }: AuthRedirectRouteProps) => {
  const { user } = useAuth();

  if (user) {
    // Jika user sudah login, arahkan ke dashboard
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
};

export default AuthRedirectRoute;