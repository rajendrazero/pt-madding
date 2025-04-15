import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthCard from '../../components/AuthCard';
import axios from '../../api/axios';
import { useLoading } from '../../context/LoadingContext';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const { loading, setLoading } = useLoading();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      await axios.post('/auth/verify-code', { email, code });
      setMessage('Verifikasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('Kode verifikasi salah atau gagal.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setResendMessage('');
      await axios.post('/auth/resend-code', { email });
      setResendMessage('Kode baru telah dikirim ke email Anda.');
    } catch (err) {
      setResendMessage('Gagal mengirim ulang kode.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Verifikasi Email" icon={<i className="fas fa-envelope text-green-600 text-2xl"></i>}>
      <form onSubmit={handleVerify} className="w-full max-w-md">
        {message && <p className="text-sm text-center text-blue-500 mb-2">{message}</p>}

        <div className="flex items-center justify-center text-yellow-600 text-sm mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span>Periksa folder Spam pada Gmail Anda</span>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Kode Verifikasi"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white py-2 rounded-xl font-semibold transition duration-300 disabled:opacity-60"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memverifikasi...
            </div>
          ) : (
            'Verifikasi'
          )}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-sm text-green-600 hover:underline disabled:opacity-60"
          >
            Kirim Ulang Kode
          </button>
          {resendMessage && <p className="mt-2 text-sm text-blue-500">{resendMessage}</p>}
        </div>
      </form>
    </AuthCard>
  );
}