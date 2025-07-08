import React, { useState } from 'react';
import { sendPasswordReset } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Digite o e-mail cadastrado.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSuccess('Enviamos um link de redefinição para seu e-mail.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError('Erro ao enviar e-mail. Verifique o e-mail digitado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authincation-content">
      <h3 className="mb-1 font-w300 text-center">Recuperar senha</h3>
      {error && <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">{error}</div>}
      {success && <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><strong>Email</strong></label>
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu e-mail cadastrado"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar link de redefinição'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm; 