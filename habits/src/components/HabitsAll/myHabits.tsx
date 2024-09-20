'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import Habit from '../../interfaces/IHabit';

const MyHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const habitsList: Habit[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Habit));
        setHabits(habitsList);
      }
    };

    fetchHabits();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

// Componente individual de hábito
const HabitItem = ({ habit }: { habit: Habit }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si se muestra la información adicional

  const toggleOpen = () => {
    setIsOpen(!isOpen); // Alternar entre mostrar y ocultar la información adicional
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <h2
        onClick={toggleOpen} // Activar la función de alternancia al hacer clic
        className="text-xl font-semibold mb-4"
      >
        {habit.name}
      </h2>
      {isOpen && ( // Mostrar información adicional solo si el estado `isOpen` es verdadero
        <div className="mt-2">
          <p>Comienzo: {habit.startDate}</p>
          <p>Frecuencia: {habit.frequency}</p>
          <p>Recordatorio: {habit.reminderTime || 'No configurado'}</p>
        </div>
      )}
    </div>
  );
};

export default MyHabits;


