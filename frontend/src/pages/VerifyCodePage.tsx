import React, { useState } from 'react';
import { verifyCode } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const VerifyCodePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (data: { email: string; code: string }) => {
    try {
      await verifyCode(data);
      navigate('/login'); // Pindah ke halaman login setelah verifikasi berhasil
    } catch (error: any) {
      setError(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Verifikasi Kode</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AuthForm
        onSubmit={handleVerify}
        submitButtonText="Verifikasi"
        fields={[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Kode Verifikasi', name: 'code', type: 'text' },
        ]}
      />
    </div>
  );
};

export default VerifyCodePage;