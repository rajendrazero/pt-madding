import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://pt-madding-api-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) throw new Error('Login gagal')
      const data = await res.json()

      login(data.accessToken)
      setError('')

      // arahkan sesuai role
      if (data.user.role === 'admin') navigate('/admin')
      else navigate('/user')
    } catch (err) {
      setError('Email atau password salah.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2" required />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Masuk</button>
    </form>
  )
}