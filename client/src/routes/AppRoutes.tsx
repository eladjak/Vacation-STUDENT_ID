import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../components/Dashboard';
import AdminDashboard from '../components/AdminDashboard';
import VacationsPage from '../pages/VacationsPage';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={isAuthenticated ? <VacationsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin" 
        element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
      />
    </Routes>
  );
};

export default AppRoutes; 