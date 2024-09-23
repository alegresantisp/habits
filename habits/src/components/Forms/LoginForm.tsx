'use client';

import React, { useState } from 'react'; // Importa useState
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, provider } from '../../lib/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Loader from '../Loader/Loader'; // Asegúrate de que la ruta sea correcta

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Estado para la carga

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
      setLoading(true); // Activa el loader
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        router.push('/'); // Redirige al home después de iniciar sesión
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
      } finally {
        setLoading(false); // Desactiva el loader al finalizar
      }
    },
  });

  const handleGoogleLogin = async () => {
    setLoading(true); // Activa el loader
    try {
      await signInWithPopup(auth, provider);
      router.push('/');  
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
    } finally {
      setLoading(false); // Desactiva el loader al finalizar
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="https://res.cloudinary.com/dhli2ym3v/video/upload/v1727117061/health_euckg2.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>
      {/* Superposición grisácea */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-40"></div>
      {loading && <Loader />} {/* Muestra el loader si loading es true */}
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg opacity-90">
        <h1 className="text-3xl font-bold text-center text-green-600">Ingresá para comenzar tu viaje saludable</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
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
            Ingresá
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            Ingresá con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
