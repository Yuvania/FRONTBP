// src/auth/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

  export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {

    const usuario = localStorage.getItem("usuario");

    const { isAuthenticated } = useAuth();
    
    const accesoValido = isAuthenticated && usuario;

    return accesoValido ? children : <Navigate to="/login" replace />;

  //  return isAuthenticated ? children : <Navigate to="/login" />;

  };

