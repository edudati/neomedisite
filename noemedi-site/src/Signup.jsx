import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const roles = [
  "super", "admin", "manager", "assistant",
  "professional", "client", "tutor"
];

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', senha: '', role: 'client' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, email, senha, role } = form;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, senha);
      const user = result.user;
      if (!user) throw new Error("Usuário não criado");

      const token = await user.getIdToken();

      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, role })
      });

      if (!response.ok) throw new Error("Erro no backend");

      alert("Usuário criado com sucesso!");
      navigate("/");

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert("E-mail já cadastrado.");
      } else {
        alert("Erro ao criar usuário.");
      }
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={form.senha}
        onChange={handleChange}
      />
      <select name="role" value={form.role} onChange={handleChange}>
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <button onClick={handleSignup}>Cadastrar</button>
    </div>
  );
}

export default Signup;
