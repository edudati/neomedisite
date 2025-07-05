import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Unauthorized from './Unauthorized';
import RoleProtectedRoute from './RoleProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route 
          path="/home" 
          element={
            <RoleProtectedRoute>
              <Home />
            </RoleProtectedRoute>
          } 
        />
        {/* Exemplos de rotas por role */}
        <Route 
          path="/admin" 
          element={
            <RoleProtectedRoute requiredRole="admin">
              <div style={{ padding: '20px' }}>
                <h1>Painel Administrativo</h1>
                <p>Apenas administradores podem ver esta página.</p>
              </div>
            </RoleProtectedRoute>
          } 
        />
        <Route 
          path="/professional" 
          element={
            <RoleProtectedRoute requiredRole="professional">
              <div style={{ padding: '20px' }}>
                <h1>Área do Profissional</h1>
                <p>Apenas profissionais podem ver esta página.</p>
              </div>
            </RoleProtectedRoute>
          } 
        />
        <Route 
          path="/staff" 
          element={
            <RoleProtectedRoute allowedRoles={["admin", "professional"]}>
              <div style={{ padding: '20px' }}>
                <h1>Área da Equipe</h1>
                <p>Administradores e profissionais podem ver esta página.</p>
              </div>
            </RoleProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <RoleProtectedRoute>
              <div style={{ padding: '20px' }}>
                <h1>Dashboard Geral</h1>
                <p>Qualquer usuário autenticado pode ver esta página.</p>
              </div>
            </RoleProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
