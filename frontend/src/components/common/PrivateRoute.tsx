import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // 1. While the context is checking the token, show a loading message
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // 2. Once loading is false, check if authenticated
  // If yes, render the child component (e.g., Dashboard)
  // If no, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;