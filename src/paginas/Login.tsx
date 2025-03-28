// src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login: React.FC = () => {
  const [nombreUsuario, setnombreUsuario] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(nombreUsuario, contrasena);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Usuario no válido');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            value={nombreUsuario}
            onChange={(e) => setnombreUsuario(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setcontrasena(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
