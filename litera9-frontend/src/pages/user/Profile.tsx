import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'

export default function Profile() {
  const { user, token, setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [gender, setGender] = useState('')
  const [userClass, setUserClass] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Effect triggered')
    console.log({ user, token })

    const syncUserData = (userData: any) => {
      console.log('User Data Fetched:', userData)
      setEmail(userData.email || '')
      setName(userData.username || '')
      setPhotoUrl(userData.photo_url || '')
      setGender(userData.gender || '')
      setUserClass(userData.class || '')
      setDescription(userData.description || '')
    }

    const fetchUserData = async () => {
      try {
        console.log('Fetching user data with ID:', user?.userId)
        const res = await axios.get(`/user/${user?.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const fetchedUser = res.data
        syncUserData(fetchedUser)
        setUser(fetchedUser)
      } catch (err) {
        console.error('Gagal mengambil data profil:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.userId && token) {
      fetchUserData()
    } else {
      console.log('User or token is missing, skipping fetch')
      setLoading(false)
    }
  }, [user?.userId, token])

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-4">Memuat Profil...</h1>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow p-8 flex flex-col sm:flex-row gap-8">
        <div className="flex-shrink-0 flex justify-center sm:block">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Foto Profil"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-300"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Tidak ada foto
            </div>
          )}
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-sm">{email}</p>
          <div className="mt-3">
            <p className="text-md text-gray-700"><strong>Jenis Kelamin:</strong> {gender}</p>
            <p className="text-md text-gray-700"><strong>Kelas:</strong> {userClass}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tentang Saya</h3>
        <p className="text-gray-700 leading-relaxed">
          {description || 'Belum ada deskripsi.'}
        </p>
      </div>
    </DashboardLayout>
  )
}