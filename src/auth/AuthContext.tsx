// src/auth/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { authService } from './authService';

type User = {
  id: number;
  nombreUsuario: string;
  rol: string;
};

interface AuthContextType {
  usuario: User | null;
  isAuthenticated: boolean;
  login: (nombreUsuario: string, contrasena: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<User | null>(authService.getUsuario());
  const isAuthenticated = !!usuario;

  const login = async (nombreUsuario: string, contrasena: string) => {
    const user = await authService.login(nombreUsuario, contrasena);
    if (user) {
      setUsuario(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};