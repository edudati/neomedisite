import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, senha);
      const user = result.user;
      const token = await user.getIdToken();

      console.log('Usuário:', user.email);
      console.log('Token JWT:', token);

      // Aqui você enviará esse token ao FastAPI depois

    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  };

  return (
    <div>
      <h2>Login com E-mail</h2>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Entrar</button>
      <p>Não tem conta? <Link to="/signup">Cadastre-se</Link></p>
    </div>
  );
}

export default Login;
