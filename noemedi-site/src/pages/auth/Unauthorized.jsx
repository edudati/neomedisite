import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '50px auto',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#dc3545' }}>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <p>Entre em contato com o administrador se acredita que isso é um erro.</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link 
          to="/home" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Voltar ao Início
        </Link>
        
        <Link 
          to="/" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          Fazer Logout
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized; 