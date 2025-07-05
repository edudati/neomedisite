import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    } else {
      console.error('Erro no logout:', result.error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Bem-vindo ao Neomedi!</h1>
      <p>Você está logado com sucesso.</p>
      
      {user && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px', 
          marginTop: '20px' 
        }}>
          <h3>Informações do usuário:</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.user_id}</p>
          <p><strong>Perfil:</strong> <span style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '12px' 
          }}>{user.role || 'N/A'}</span></p>
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Home; 