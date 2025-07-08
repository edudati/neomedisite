import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      // Solicita senha novamente para autenticar
      const senha = prompt('Digite sua senha para reenviar o email de verificação:');
      if (!senha) {
        setLoading(false);
        return;
      }
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, senha);
      await result.user.sendEmailVerification();
      setMessage('Novo email de verificação enviado! Verifique sua caixa de entrada.');
    } catch (err) {
      setError('Erro ao reenviar email. Verifique sua senha e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="authincation-content" style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h2>Verifique seu e-mail</h2>
      <p>Seu cadastro foi realizado, mas falta confirmar seu e-mail.<br />
      Enviamos um link de ativação para <b>{email}</b>.<br />
      Por favor, acesse seu e-mail e clique no link para ativar sua conta.</p>
      {message && <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">{message}</div>}
      {error && <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">{error}</div>}
      <button className="btn btn-primary mt-3" onClick={handleResend} disabled={loading}>
        {loading ? 'Enviando...' : 'Reenviar email de verificação'}
      </button>
      <button className="btn btn-link mt-3" onClick={handleLogout}>
        Voltar para login
      </button>
    </div>
  );
}

export default VerifyEmail; 