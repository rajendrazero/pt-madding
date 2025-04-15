// src/pages/auth/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthCard from '../../components/AuthCard';
import { useLoading } from '../../context/LoadingContext'; // Tambahkan ini

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { loading, setLoading } = useLoading(); // Gunakan loading dari context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    const isValid = username.trim() && email.trim() && password.length >= 6;
    if (!isValid) {
      setMessage('Pastikan semua data valid. Password minimal 6 karakter.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      await axios.post('/auth/register', { username, email, password });
      setMessage('Kode verifikasi telah dikirim ke email.');
      setTimeout(() => navigate('/verify-code?email=' + encodeURIComponent(email)), 1500);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Gagal mendaftar. Coba lagi.';
      setMessage(errMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Daftar" icon={<i className="fas fa-book-reader text-blue-600 text-2xl"></i>}>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {message && (
          <p className="text-sm text-center text-red-600 mb-4">{message}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password (min 6 karakter)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2 rounded-xl font-semibold transition duration-300 disabled:opacity-60"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses...
            </div>
          ) : (
            'Daftar'
          )}
        </button>
      </form>
    </AuthCard>
  );
}