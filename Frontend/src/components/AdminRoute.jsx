import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  return token && isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
