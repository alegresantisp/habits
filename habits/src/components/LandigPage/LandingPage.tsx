'use client';
import React from 'react';
import { useAuth } from '../Context/AuthContext'; // Verifica la ruta
import Link from 'next/link';
import MyHabits from '../HabitsAll/myHabits';

const LandingPage = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Bienvenido a Habit Tracker, {user?.displayName || 'Usuario'}
        </h1>
        <p className="text-xl text-gray-700">Este es tu progreso.</p>
      </div>
       {/* Sección de hábitos */}
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tus Hábitos</h2>
        <MyHabits /> {/* Renderizar los hábitos aquí */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Crear Hábitos</h2>
          <p className="text-gray-600 mb-4">Define y sigue tus hábitos diarios para mejorar tu vida.</p>
          <Link href="/dashboard/createhabits" className="text-blue-500 hover:underline">Comenzar</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Ver Progreso</h2>
          <p className="text-gray-600 mb-4">Revisa tu progreso y analiza tus hábitos a lo largo del tiempo.</p>
          <a href="/progress" className="text-blue-500 hover:underline">Ver Progreso</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Configurar Recordatorios</h2>
          <p className="text-gray-600 mb-4">Configura recordatorios para mantenerte en el camino correcto.</p>
          <a href="/reminders" className="text-blue-500 hover:underline">Configurar</a>
        </div>
        {/* Agrega más tarjetas aquí si es necesario */}
      </div>
    </div>
  );
};

export default LandingPage;

