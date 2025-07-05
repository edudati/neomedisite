import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
