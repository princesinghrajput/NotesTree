import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { AuthPages } from '../pages/auth';
import { NotesApp } from '../pages/app';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from "../context/AuthContext";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthPages />} />
        
        {/* Protected Routes */}
        <Route
          path="/app/*"
          element={
            <PrivateRoute>
              <NotesApp />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}; 