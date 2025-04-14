import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layout/DashboardLayout'
import { useState } from 'react'
import axios from 'axios'

export default function Profile() {
  const { user, token, setUser } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [name, setName] = useState(user?.name || '')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        'https://pt-madding-api-production.up.railway.app/api/user/profile',
        { email, name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUser(res.data.user)
      setMessage('Profil berhasil diperbarui.')
    } catch (err) {
      setMessage('Gagal memperbarui profil.')
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">Profil</h1>
      {message && <p className="text-sm text-center text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nama"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </DashboardLayout>
  )
}