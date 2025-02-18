/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = () => {
  const { token } = useContext(ShopContext);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
