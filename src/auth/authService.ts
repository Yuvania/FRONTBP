// src/auth/authService.ts

type User = {
    id: number;
    nombreUsuario: string;
    rol: string;
  };
  
  export const authService = {
    login: async (nombreUsuario: string, contrasena: string): Promise<User | null> => {
      try {
        const response = await fetch('https://localhost:7019/api/Login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombreUsuario, contrasena }),
        });
  
        if (!response.ok) return null;
  
        const user = await response.json();
        localStorage.setItem('usuario', JSON.stringify(user));
        return user;
      } catch (error) {
        return null;
      }
    },
  
    logout: () => {
      localStorage.removeItem('usuario');
    },
  
    getUsuario: (): User | null => {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    },
  
    isAuthenticated: (): boolean => {
      return !!localStorage.getItem('usuario');
    }
  };
  