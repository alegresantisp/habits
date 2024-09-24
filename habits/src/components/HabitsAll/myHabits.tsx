'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import Habit from '../../interfaces/IHabit';
import { FaSeedling, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { deleteHabit } from '../../helpers/habitsHelpers'; 
import Loader from '../Loader/Loader';


const MyHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useAuth();

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) {
        console.log('User is not authenticated or user ID is undefined');
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const habitsList: Habit[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Habit));
        setHabits(habitsList);
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false); // Asegúrate de detener el estado de carga
      }
    };

    fetchHabits();
  }, [user]);

  if (loading) {
    return <Loader />; // Mostrar un mensaje mientras carga
  }

  const handleDelete = async (habitId?: string) => {
    if (!habitId) return; 

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await deleteHabit(habitId);
      setHabits(habits.filter(habit => habit.id !== habitId));
      Swal.fire('Eliminado', 'El hábito ha sido eliminado.', 'success');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onDelete={handleDelete} />
      ))}
    </div>
  );
};

const HabitItem = ({ habit, onDelete }: { habit: Habit, onDelete: (id?: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col justify-between">
      <h2
        onClick={toggleOpen}
        className="text-xl font-semibold mb-4 text-blue-700 hover:text-blue-500 transition duration-200"
      >
        {habit.name}
      </h2>
      {isOpen && (
        <div className="mt-2">
          <p className="text-gray-700">Comienzo: {habit.startDate}</p>
          <p className="text-gray-700">Frecuencia: {habit.frequency}</p>
          <p className="text-gray-700">Recordatorio: {habit.reminderTime || 'No configurado'}</p>
          <button
            onClick={() => onDelete(habit.id)} 
            className=" text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      )}
      {!isOpen && <FaSeedling className="text-green-500 mt-2" size={24} />} 
    </div>
  );
};

export default MyHabits;


