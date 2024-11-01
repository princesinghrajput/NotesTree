import React from 'react';
import { Toaster } from 'react-hot-toast';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import { Router } from './routes';
import { TOAST_CONFIG } from './config/ui';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      
      <NoteProvider>
        <Router />
        <Toaster 
          position={TOAST_CONFIG.position} 
          toastOptions={TOAST_CONFIG.options} 
        />
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;