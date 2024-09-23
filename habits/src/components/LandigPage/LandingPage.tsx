'use client';
import { useAuth } from '../Context/AuthContext'; 
import Link from 'next/link';
import MyHabits from '../HabitsAll/myHabits';
import Calendar from '../Calendar/Calendar';
import Graphics from '../Graphics/Graphics'; 
import Graphics1 from '../Graphics/Graphics1';


import { useHabitContext } from '../Context/HabitContext';

const LandingPage = () => {
  const { user } = useAuth(); 
  const { habits } = useHabitContext(); 

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Bienvenido a <span className="text-orange-500">Habit</span>  Tracker, {user?.displayName || 'Usuario'}
        </h1>
        <p className="text-xl text-gray-700">Este es tu Dashboard.</p>
      </div>
       
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tus Hábitos</h2>
        <MyHabits /> 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-verde-celeste p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Crear Hábitos</h2>
          <p className="text-gray-600 mb-4">Define y sigue tus hábitos diarios para mejorar tu vida.</p>
          <Link href="/dashboard/createhabits" className="text-blue-500 hover:underline">Comenzar</Link>
        </div>
        <div className="bg-verde-celeste p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Ver Progreso</h2>
          <p className="text-gray-600 mb-4">Revisa tu progreso y analiza tus hábitos a lo largo del tiempo.</p>
          <Link href="/dashboard/progress" className="text-blue-500 hover:underline">Ver Progreso</Link>
        </div>
        <div className="bg-verde-celeste p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Configurar Recordatorios</h2>
          <p className="text-gray-600 mb-4">Configura recordatorios para mantenerte en el camino correcto.</p>
          <a href="/reminders" className="text-blue-500 hover:underline">Configurar</a>
        </div>
        
      </div>
      <div className="flex space-x-6 mt-4">
        <div className="flex-1">
          <Calendar />
        </div>
        <div className="flex-1">
          <Graphics habits={habits} />
        </div>
        <div className="flex-1">
          <Graphics1 habits={habits} /> 
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

