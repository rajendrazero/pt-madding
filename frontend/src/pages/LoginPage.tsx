import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data);
      navigate('/dashboard'); // Ganti dengan halaman yang sesuai setelah login
    } catch (error: any) {
      setError(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Masuk</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AuthForm
        onSubmit={handleLogin}
        submitButtonText="Masuk"
        fields={[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ]}
      />
    </div>
  );
};

export default LoginPage;