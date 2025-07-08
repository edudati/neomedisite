import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/dashboard/Home';
import Unauthorized from './pages/auth/Unauthorized';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import ResetPassword from './pages/auth/ResetPassword';
import SignupThankYou from './pages/auth/SignupThankYou';
import VerifyEmail from './pages/auth/VerifyEmail';
import ChooseProfile from './pages/auth/ChooseProfile';
import Admin from './pages/dashboard/Admin';
import Client from './pages/dashboard/Client';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/recuperar-senha" element={<ResetPassword />} />
        <Route path="/cadastro-obrigado" element={<SignupThankYou />} />
        <Route path="/verificar-email" element={<VerifyEmail />} />
        <Route path="/escolher-perfil" element={<ChooseProfile />} />
        <Route 
          path="/home" 
          element={
            <RoleProtectedRoute>
              <Home />
            </RoleProtectedRoute>
          } 
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        {/* Exemplos de rotas por profile */}
        <Route 
          path="/professional" 
          element={
            <RoleProtectedRoute requiredRole="PROFESSIONAL">
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
            <RoleProtectedRoute allowedRoles={["ADMIN", "PROFESSIONAL"]}>
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
