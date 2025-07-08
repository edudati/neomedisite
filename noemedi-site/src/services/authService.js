import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../config/firebase';

const auth = getAuth(app);

export const loginWithEmailAndPassword = async (email, senha) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, senha);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signupWithEmailAndPassword = async ({ name, email, senha, role }) => {
  try {
    // 1. Cria usuário no Firebase
    const result = await createUserWithEmailAndPassword(auth, email, senha);
    const user = result.user;
    if (!user) throw new Error('Usuário não criado');

    // 2. Envia email de verificação
    await user.sendEmailVerification();

    // 3. Pega token do Firebase
    const token = await user.getIdToken();

    // 4. Cria usuário no backend
    const response = await fetch('http://127.0.0.1:8000/api/v1/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, role }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Erro ao criar usuário no backend');
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const sendPasswordReset = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    throw error;
  }
};
