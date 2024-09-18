// context/AuthContext.tsx
'use client';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { loginWithEmail } from '@/helpers/authHelpers';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('userName', currentUser.displayName || '');
      } else {
        setUser(null);
        localStorage.removeItem('userName');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginWithEmail(email, password);
      router.push('/');
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error) {
      console.error('Error de autenticación con Google:', error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
