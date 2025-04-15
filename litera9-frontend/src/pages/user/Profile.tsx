import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'

export default function Profile() {
  const { user, token, setUser } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [name, setName] = useState(user?.username || '')
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || '')
  const [gender, setGender] = useState(user?.gender || '')
  const [userClass, setUserClass] = useState(user?.class || '')
  const [description, setDescription] = useState(user?.description || '')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch user data from the API if `user` is not available yet (if token is changed or user is not in context)
  useEffect(() => {
    if (!user) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(
            '/user',
            { headers: { Authorization: `Bearer ${token}` } }
          )
          const { user } = res.data
          setEmail(user.email)
          setName(user.username)
          setPhotoUrl(user.photo_url || '')
          setGender(user.gender || '')
          setUserClass(user.class || '')
          setDescription(user.description || '')
          setLoading(false)
        } catch (err) {
          setMessage('Gagal mengambil data profil.')
          setLoading(false)
        }
      }

      fetchUserData()
    } else {
      setLoading(false) // Skip loading if user is already available
    }
  }, [user, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        '/user/profile',
        { email, name, photo_url: photoUrl, gender, class: userClass, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUser(res.data.user)
      setMessage('Profil berhasil diperbarui.')
    } catch (err) {
      setMessage('Gagal memperbarui profil.')
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-4">Memuat Profil...</h1>
      </DashboardLayout>
    )
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
          placeholder="Nama Pengguna"
        />
        <input
          className="border p-2 rounded"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          type="text"
          placeholder="URL Foto"
        />
        <input
          className="border p-2 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          type="text"
          placeholder="Jenis Kelamin"
        />
        <input
          className="border p-2 rounded"
          value={userClass}
          onChange={(e) => setUserClass(e.target.value)}
          type="text"
          placeholder="Kelas"
        />
        <textarea
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </DashboardLayout>
  )
}