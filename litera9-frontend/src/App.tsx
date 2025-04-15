import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { injectInterceptors } from './api/axios'; // Mengimpor injectInterceptors

function AppContent() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    injectInterceptors(setLoading); // Panggil injectInterceptors untuk mengaktifkan interceptors axios
  }, [setLoading]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/60 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin" />
          Memuat...
        </div>
      )}
      <RouterProvider router={routes} />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}