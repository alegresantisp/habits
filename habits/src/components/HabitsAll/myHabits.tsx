// components/myHabits.tsx

// components/myHabits.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext'; // Asegúrate de que el contexto esté disponible

// Definir la interfaz para un hábito
interface Habit {
    id: string;
    name: string;
    // Agrega aquí otros campos relevantes de tu base de datos
  }

const MyHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useAuth(); // Obtener el usuario del contexto

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const habitsList: Habit[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit)); 
        setHabits(habitsList);
      }
    };

    fetchHabits();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map(habit => (
        <div key={habit.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">{habit.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default MyHabits;


