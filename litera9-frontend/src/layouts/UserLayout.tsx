import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

export default function UserLayout({ children }: Props) {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">User Area</h1>
      {children || <Outlet />}
    </div>
  );
}