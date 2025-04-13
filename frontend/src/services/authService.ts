import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Sesuaikan dengan URL backend kamu
});

export const registerUser = async (data: { email: string; password: string }) => {
  return api.post('/register', data);
};

export const verifyCode = async (data: { email: string; code: string }) => {
  return api.post('/verify-code', data);
};

export const resendCode = async (email: string) => {
  return api.post('/resend-code', { email });
};

export const loginUser = async (data: { email: string; password: string }) => {
  return api.post('/login', data);
};

export const getUserInfo = async (token: string) => {
  return api.get('/me', { headers: { Authorization: `Bearer ${token}` } });
};