import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <div className="relative min-h-screen bg-background text-text font-sans antialiased selection:bg-accent/30">
            {/* Global Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            <RouterProvider router={router} />
          </div>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
