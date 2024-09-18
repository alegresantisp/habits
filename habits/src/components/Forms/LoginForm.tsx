'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, provider } from '../../lib/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        router.push('/'); // Redirige al home después de iniciar sesión
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');  
    } catch (error) {
        console.error('Error durante el inicio de sesión con Google:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-600">Login to Your Healthy Habits</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4 12.5c0-1.5-.1-2.8-.3-4.1H12v8h6.4c-3-2.8-7.7-4.7-13.4-4.7-8.6 0-15.6 7-15.6 15.6s7 15.6 15.6 15.6c9.2 0 15.6-7.7 15.6-15.6z" fill="#4285F4"/>
              <path d="M12 6.8c-2.3 0-4.4.8-6.1 2.1L6.2 12.6c1.8 1.1 4 1.7 6.2 1.7 3.1 0 5.7-1.1 7.7-3.1L12 6.8z" fill="#34A853"/>
              <path d="M6.2 12.6c-1.8-1.1-3.2-2.7-4.4-4.6L0 12c-3.5-5.3-3.5-11.5 0-16.8l6.2 6.2c1.8 1.8 3.6 3.2 5.8 4.4l-5.8 5.8c-2.5-1.8-4.7-4.3-6.4-7.3z" fill="#FBBC05"/>
              <path d="M12 6.8L6.2 12.6c2.5 2.2 5.6 3.4 8.8 3.4 5.7 0 10.4-4.7 10.4-10.4 0-.6-.1-1.3-.1-1.9H12z" fill="#EA4335"/>
            </svg>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

