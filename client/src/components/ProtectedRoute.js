import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token, initializing } = useAuth();

  if (initializing) {
    return <div style={{ padding: 32 }}>Loading...</div>;
  }

  if (!token) {
    // User not logged in
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role!== 'admin') {
    // User is not an admin but trying to access an admin route
    return <Navigate to="/" />; // Or show an "Access Denied" page
  }

  return children;
};

export default ProtectedRoute;