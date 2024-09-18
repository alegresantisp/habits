// authHelpers.ts
import { auth, signInWithEmailAndPassword, provider, signInWithPopup } from '../lib/firebaseConfig';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Usuario autenticado exitosamente
    console.log('Usuario autenticado:', userCredential.user);
  } catch (error) {
    console.error('Error de autenticación:', error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Usuario autenticado exitosamente con Google
    console.log('Usuario autenticado con Google:', result.user);
  } catch (error) {
    console.error('Error de autenticación con Google:', error);
  }
};
