import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProfileProtectedRoute({ children, requiredProfile, allowedProfiles, fallbackPath = "/" }) {
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

  // Verificar se tem profile
  //  válido
  let hasValidProfile = false;
  
  if (requiredProfile) {
    hasValidProfile = user?.profile === requiredProfile;
  } else if (allowedProfiles && Array.isArray(allowedProfiles)) {
    hasValidProfile = allowedProfiles.includes(user?.profile);
  } else {
    // Se não especificar role, qualquer usuário autenticado pode acessar
    hasValidProfile = true;
  }

  if (!hasValidProfile) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProfileProtectedRoute; 