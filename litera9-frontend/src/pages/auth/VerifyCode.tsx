import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function VerifyCode() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://pt-madding-api-production.up.railway.app/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })

      if (!res.ok) throw new Error('Kode salah')

      setMessage('Verifikasi berhasil! Silakan login.')
      setTimeout(() => navigate('/login'), 1500)
    } catch {
      setMessage('Kode verifikasi salah atau gagal.')
    }
  }

  return (
    <form onSubmit={handleVerify} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Verifikasi Email</h2>
      {message && <p className="text-blue-500">{message}</p>}
      <input type="text" placeholder="Kode Verifikasi" value={code} onChange={e => setCode(e.target.value)} className="w-full border p-2" required />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Verifikasi</button>
    </form>
  )
}