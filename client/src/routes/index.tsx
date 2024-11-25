import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  AdminDashboard,
  Dashboard
} from '../components';
import VacationsPage from '../pages/VacationsPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import { useAuth } from '../providers/AuthProvider';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <VacationsPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes; 