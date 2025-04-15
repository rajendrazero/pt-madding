import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';

type Props = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Admin Area</h1>
        {children || <Outlet />}
      </div>
    </ProtectedRoute>
  );
}