import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

export default function UserLayout() {
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <div className="min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">User Area</h1>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}