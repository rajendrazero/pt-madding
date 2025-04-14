import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/AuthCard'

export default function Register() {
  const [username, setUsername] = useState('') // Menambahkan state untuk username
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://pt-madding-api-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) // Kirimkan username
      })

      if (!res.ok) throw new Error('Gagal daftar')

      setMessage('Kode verifikasi telah dikirim ke email.')
      setTimeout(() => navigate('/verify-code?email=' + encodeURIComponent(email)), 1500)
    } catch (err) {
      setMessage('Gagal mendaftar. Coba lagi.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AuthCard title="Daftar">
        {message && (
          <p className="text-sm text-center text-green-600 mb-2">{message}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Daftar
        </button>
      </AuthCard>
    </form>
  )
}