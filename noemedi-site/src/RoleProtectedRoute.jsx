import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RoleProtectedRoute({ children, requiredRole, allowedRoles, fallbackPath = "/" }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Verificar se tem role válido
  let hasValidRole = false;
  
  if (requiredRole) {
    hasValidRole = user?.role === requiredRole;
  } else if (allowedRoles && Array.isArray(allowedRoles)) {
    hasValidRole = allowedRoles.includes(user?.role);
  } else {
    // Se não especificar role, qualquer usuário autenticado pode acessar
    hasValidRole = true;
  }

  if (!hasValidRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleProtectedRoute; 