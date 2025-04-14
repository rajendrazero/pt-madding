import { useEffect, useState } from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

type User = {
  id: string
  email: string
  name: string
  isDeleted: boolean
}

export default function UserList() {
  const { token } = useAuth()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get('https://pt-madding-api-production.up.railway.app/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.users || []))
  }, [token])

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">Daftar Pengguna</h1>
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            {u.isDeleted ? (
              <span className="text-red-500 text-sm">Terhapus</span>
            ) : (
              <button
                onClick={() => handleDelete(u.id)}
                className="text-sm text-red-500"
              >
                Hapus
              </button>
            )}
          </li>
        ))}
      </ul>
    </DashboardLayout>
  )

  function handleDelete(id: string) {
    axios
      .delete(`https://pt-madding-api-production.up.railway.app/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers((prev) => prev.map(u => u.id === id ? { ...u, isDeleted: true } : u))
      })
  }
}