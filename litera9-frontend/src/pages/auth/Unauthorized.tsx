// src/pages/Unauthorized.tsx
export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          Akses Ditolak
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <p className="text-center text-gray-500 mb-6">
          Silakan kembali atau hubungi administrator.
        </p>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}