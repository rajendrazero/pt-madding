import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';

type User = {
  id: string;
  email: string;
  username: string;
  isDeleted: boolean;
};

export default function DeletedUsers() {
  const { token } = useAuth();
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('https://pt-madding-api-production.up.railway.app/api/admin/users/deleted', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDeletedUsers(res.data.users || []));
  }, [token]);

  function recoverUser(id: string) {
    axios
      .patch(
        `https://pt-madding-api-production.up.railway.app/api/admin/users/${id}/recover`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setDeletedUsers((prev) => prev.filter((u) => u.id !== id));
      });
  }

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">User Terhapus</h1>
      <ul className="space-y-3">
        {deletedUsers.map((u) => (
          <li key={u.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{u.username}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <button
              onClick={() => recoverUser(u.id)}
              className="text-sm text-blue-500"
            >
              Pulihkan
            </button>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}