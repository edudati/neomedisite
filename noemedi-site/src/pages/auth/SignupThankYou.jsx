import React from 'react';
import { Link } from 'react-router-dom';

function SignupThankYou() {
  return (
    <div className="authincation-content" style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h2>Cadastro realizado!</h2>
      <p>Enviamos um e-mail de ativação para você.<br />
      Por favor, acesse seu e-mail e clique no link para confirmar sua identidade e ativar sua conta.</p>
      <p>Após a confirmação, você poderá fazer login normalmente.</p>
      <Link to="/login" className="btn btn-primary mt-3">Ir para login</Link>
    </div>
  );
}

export default SignupThankYou; 