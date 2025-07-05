import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se há uma sessão válida ao carregar a aplicação
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/session/verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id_token: token }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.detail };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/session/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return { success: true };
      } else {
        return { success: false, error: 'Erro no logout' };
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 