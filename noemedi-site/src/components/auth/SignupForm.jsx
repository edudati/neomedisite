import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import logotext from '../../assets/images/logo-text.png';
import { signupWithEmailAndPassword, signInWithGoogle } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Remover perfil
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      setSuccess('');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await signupWithEmailAndPassword({ name: '', email, senha });
      navigate('/cadastro-obrigado');
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const user = await signInWithGoogle();
      const token = await user.getIdToken();
      const loginResult = await login(token);
      if (loginResult.success) {
        setSuccess('Cadastro realizado com sucesso!');
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setError(loginResult.error || 'Erro ao criar sessão');
      }
    } catch (error) {
      setError('Erro ao cadastrar com Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authincation-content">
      <div className="login-logo d-flex align-items-center justify-content-center mb-4">
        <img src={logo} alt="Logo" className="me-2" style={{ height: 40 }} />
        <img src={logotext} alt="Texto do Logo" className="ms-1" style={{ height: 40 }} />
      </div>
      <h3 className="mb-1 font-w600 text-center">Cadastrar</h3>
      {error && <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">{error}</div>}
      {success && <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">{success}</div>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label><strong>Email</strong></label>
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label><strong>Senha</strong></label>
          <input
            type="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        {/* Remover campo de perfil */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
        {/* Botão Entrar com Google */}
        <div className="mb-2 mt-2">
          <button type="button" className="btn btn-light btn-block d-flex align-items-center justify-content-center" style={{ border: '1px solid #dadce0', color: '#3c4043', background: '#fff', width: '100%', height: '48px', fontWeight: 500 }} onClick={handleGoogleSignup} disabled={loading}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
              <svg width="22" height="22" viewBox="0 0 48 48" style={{ display: 'block' }}><g><path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C33.962 32.833 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c2.73 0 5.23.936 7.217 2.482l6.571-6.571C34.583 5.099 29.617 3 24 3 12.954 3 4 11.954 4 23s8.954 20 20 20c10.477 0 19.477-7.615 19.477-19.477 0-1.305-.138-2.568-.366-3.773z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.821C14.655 16.1 19.001 13 24 13c2.73 0 5.23.936 7.217 2.482l6.571-6.571C34.583 5.099 29.617 3 24 3c-6.627 0-12 5.373-12 12 0 2.042.522 3.97 1.306 5.691z"/><path fill="#FBBC05" d="M24 44c5.418 0 9.962-3.167 11.303-8.083l-8.303-6.417c-1.522 1.021-3.47 1.5-5.303 1.5-4.999 0-9.345-3.1-11.123-7.512l-6.571 5.082C7.522 40.03 13.373 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303c-1.021 2.833-3.418 5.083-7.303 5.083-2.073 0-3.999-.687-5.303-1.5l-8.303 6.417C14.655 39.9 19.001 43 24 43c10.477 0 19.477-7.615 19.477-19.477 0-1.305-.138-2.568-.366-3.773z"/></g></svg>
            </span>
            Entrar com Google
          </button>
        </div>
        {/* Link para voltar ao login */}
        <div className="text-start mt-2">
          Já tem cadastro?{' '}
          <Link to="/login" className="fw-bold text-primary">Entrar</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
