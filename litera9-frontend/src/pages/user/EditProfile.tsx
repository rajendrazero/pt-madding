import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function EditProfile() {
  const { user, token, setUser } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    gender: '',
    class: '',
    description: '',
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/user/${user?.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setForm({
          username: res.data.username || '',
          email: res.data.email || '',
          gender: res.data.gender || '',
          class: res.data.class || '',
          description: res.data.description || '',
        })
        setPreviewPhoto(res.data.photo_url || null)
      } catch (err) {
        console.error('Gagal mengambil data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.userId && token) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user?.userId, token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type before setting it
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Hanya file gambar (JPEG, PNG, WEBP) yang diizinkan.')
        return
      }

      setPhotoFile(file)
      setPreviewPhoto(URL.createObjectURL(file))
    }
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!form.username.trim()) newErrors.username = 'Nama wajib diisi.'
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi.'
    if (!form.gender) newErrors.gender = 'Jenis kelamin wajib dipilih.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setSaving(true)

    try {
      let photoUrl = previewPhoto

      if (photoFile) {
        const photoForm = new FormData()
        photoForm.append('photo', photoFile)

        // Debugging request to upload the photo
        console.log('Uploading photo...')
        const uploadRes = await axios.post('/user/upload', photoForm, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        console.log('Upload response:', uploadRes)
        photoUrl = uploadRes.data.url
      }

      const updateData = {
        ...form,
        ...(photoFile ? { photo_url: photoUrl } : {}),
      }

      // Debugging request to update profile
      console.log('Updating profile with data:', updateData)
      const updateRes = await axios.put('/user/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('Update profile response:', updateRes)
      setUser(updateRes.data)
      alert('Profil berhasil diperbarui!')
      navigate('/user/profile')
    } catch (err) {
      console.error('Gagal memperbarui profil:', err)
      alert('Gagal memperbarui profil.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-4">Memuat Data...</h1>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profil</h2>

        <div>
          <label className="block font-medium text-gray-700">Nama Lengkap</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload Foto Profil</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded p-2"
          />
          {previewPhoto && (
            <img src={previewPhoto} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full border-2" />
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Jenis Kelamin</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Kelas</label>
          <input type="text" name="class" value={form.class} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Deskripsi</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border rounded p-2" />
        </div>

        <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </DashboardLayout>
  )
}