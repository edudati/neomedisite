import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Login no Firebase
      const result = await signInWithEmailAndPassword(auth, email, senha);
      const user = result.user;
      const token = await user.getIdToken();

      console.log('Usuário:', user.email);
      console.log('Token JWT:', token);

      // Envia o token para o backend e cria a sessão
      const loginResult = await login(token);
      
      if (loginResult.success) {
        console.log('Login realizado com sucesso!');
        navigate('/home');
      } else {
        setError(loginResult.error || 'Erro ao criar sessão');
      }

    } catch (error) {
      console.error('Erro no login:', error.message);
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login com E-mail</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '15px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
      
      <button 
        onClick={handleLogin} 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      
      <p style={{ textAlign: 'center', margin: 0 }}>
        Não tem conta? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
