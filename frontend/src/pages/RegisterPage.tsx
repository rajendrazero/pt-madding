import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      await registerUser(data);
      navigate('/verify'); // Pindah ke halaman verifikasi setelah register
    } catch (error: any) {
      setError(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Daftar</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AuthForm
        onSubmit={handleRegister}
        submitButtonText="Daftar"
        fields={[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ]}
      />
    </div>
  );
};

export default RegisterPage;