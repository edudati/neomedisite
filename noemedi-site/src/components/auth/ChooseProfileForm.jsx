import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const AVAILABLE_PROFILES = [
  'SUPER',
  'ADMIN', 
  'MANAGER',
  'ASSISTANT',
  'PROFESSIONAL',
  'CLIENT',
  'TUTOR'
];

function ChooseProfileForm() {
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!profile) {
      setError('Escolha um perfil para continuar.');
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado.');
      const token = await user.getIdToken();
      
      // Envia o perfil escolhido para o backend (PUT)
      const response = await fetch('http://127.0.0.1:8000/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile }),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        if (response.status === 404) {
          navigate('/login');
          return;
        }
        throw new Error('Erro ao salvar perfil.');
      }
      
      // Atualiza o estado do usuário com os dados retornados
      const userData = await response.json();
      await login(token); // Atualiza o contexto com os novos dados
      
      // Mostra mensagem de sucesso e redireciona
      alert('Perfil atualizado com sucesso!');
      
      // Redireciona para a home específica do perfil
      const profileRoutes = {
        'SUPER': '/admin',
        'ADMIN': '/admin',
        'MANAGER': '/manager',
        'ASSISTANT': '/assistant',
        'PROFESSIONAL': '/professional',
        'CLIENT': '/client',
        'TUTOR': '/tutor'
      };
      
      const targetRoute = profileRoutes[profile] || '/home';
      navigate(targetRoute);
    } catch (err) {
      setError(err.message || 'Erro ao salvar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authincation-content" style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h2>Escolha seu perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><strong>Selecione o perfil:</strong></label>
          <select className="form-control" value={profile} onChange={e => setProfile(e.target.value)} disabled={loading}>
            <option value="">Selecione...</option>
            {AVAILABLE_PROFILES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        {error && <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">{error}</div>}
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar perfil'}
        </button>
      </form>
    </div>
  );
}

export default ChooseProfileForm; 