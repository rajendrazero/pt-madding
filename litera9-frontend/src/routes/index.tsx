import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VerifyCode from '../pages/auth/VerifyCode';
import Unauthorized from '../pages/auth/Unauthorized';

import UserDashboard from '../pages/user/UserDashboard';
import UserProfile from '../pages/user/Profile';

import AdminDashboard from '../pages/admin/AdminDashboard';
import EditUser from '../pages/admin/EditUser';
import DeletedUsers from '../pages/admin/DeletedUsers';
import SearchUser from '../pages/admin/SearchUser';
import UserList from '../pages/admin/UserList';

// Impor AuthRedirectRoute dari file baru
import AuthRedirectRoute from './AuthRedirectRoute';

export const routes = createBrowserRouter([
  // Auth routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <AuthRedirectRoute>
            <Login />
          </AuthRedirectRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <AuthRedirectRoute>
            <Register />
          </AuthRedirectRoute>
        ),
      },
      {
        path: 'verify-code',
        element: (
          <AuthRedirectRoute>
            <VerifyCode />
          </AuthRedirectRoute>
        ),
      },
      { path: 'unauthorized', element: <Unauthorized /> },
    ],
  },

  // User routes
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      { index: true, element: <UserDashboard /> },
      { path: 'profile', element: <UserProfile /> },
    ],
  },

  // Admin routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'edit/:id', element: <EditUser /> },
      { path: 'deleted-users', element: <DeletedUsers /> },
      { path: 'search', element: <SearchUser /> },
      { path: 'users', element: <UserList /> },
    ],
  },
]);