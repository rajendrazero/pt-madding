import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthCard from '../../components/AuthCard';
import { useLoading } from '../../context/LoadingContext';
import axios from '../../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const { data } = await axios.post('/auth/login', { email, password });

      login(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      const userRole = data.user?.role || 'user';
      navigate(userRole === 'admin' ? '/admin' : '/user');
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Login gagal';
      setError(errMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Masuk" icon={<i className="fas fa-sign-in-alt text-blue-600 text-2xl"></i>}>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {error && <p className="text-sm text-center text-red-600 mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            'Masuk'
          )}
        </button>
      </form>
    </AuthCard>
  );
}