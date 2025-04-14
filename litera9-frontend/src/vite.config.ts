import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://pt-madding-api-production.up.railway.app', // Ganti dengan URL API Anda
        changeOrigin: true, // Menyembunyikan asal permintaan yang asli
        secure: false, // Set ke false jika API menggunakan HTTPS dengan sertifikat tidak valid
      },
    },
  },
})