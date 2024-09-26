'use client';
import { useAuth } from '../Context/AuthContext'; 
import Link from 'next/link';
import MyHabits from '../HabitsAll/myHabits';
import Calendar from '../Calendar/Calendar';
import Graphics from '../Graphics/Graphics'; 
import Graphics1 from '../Graphics/Graphics1';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHabitContext } from '../Context/HabitContext';

const LandingPage = () => {
  const { user } = useAuth(); 
  const { habits } = useHabitContext(); 

  // Cálculo del porcentaje de hábitos completados
  const totalCheckmarks = habits.reduce((total, habit) => total + (Array.isArray(habit.isCompleted) ? habit.isCompleted.length : 0), 0);
  const completedCheckmarks = habits.reduce((completed, habit) => 
    completed + (Array.isArray(habit.isCompleted) ? habit.isCompleted.filter(Boolean).length : 0), 0);
  const completionRate = totalCheckmarks > 0 ? (completedCheckmarks / totalCheckmarks) * 100 : 0;

  return (
    <div className="relative min-h-screen p-4 sm:p-6 bg-gradient-to-b from-gray-300 to-gray-800">
      <div className="relative z-10 min-h-screen bg-transparent p-4 sm:p-6 opacity-90">
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-800 mb-4">
            Bienvenido a <span className="text-orange-500">Habit</span> Tracker, {user?.displayName || 'Usuario'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500">Este es tu Dashboard.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-500 mb-4">Tus Hábitos</h2>
          <MyHabits /> 
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Crear Hábitos</h2>
            <p className="text-gray-600 mb-2">Define y sigue tus hábitos diarios para mejorar tu vida.</p>
            <Link href="/dashboard/createhabits" className="text-violet-500 hover:underline">Comenzar</Link>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Ver Contenido</h2>
            <p className="text-gray-600 mb-2">Revisa el contenido de Habit Tracker y mantente al día con las últimas actualizaciones.</p>
            <Link href="/about" className="text-violet-500 hover:underline">Ver Contenido</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <Calendar />
          </div>
          <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <Graphics habits={habits} />
          </div>
          <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <Graphics1 habits={habits} /> 
          </div>
          <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Porcentaje de Efectividad</h2>
            <CircularProgressbar
              value={completionRate}
              text={`${Math.round(completionRate)}%`}
              styles={buildStyles({
                textColor: "#333",
                pathColor: completionRate > 50 ? "#4caf50" : "#ff5252",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
