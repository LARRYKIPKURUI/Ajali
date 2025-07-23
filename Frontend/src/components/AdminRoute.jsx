import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/auth'; // make sure this path is correct

const AdminRoute = ({ children }) => {
   if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return isAdmin() ? children : <Navigate to="/profile" replace />;
};

export default AdminRoute;
