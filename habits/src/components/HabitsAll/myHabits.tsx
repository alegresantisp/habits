'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import Habit from '../../interfaces/IHabit';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { deleteHabit } from '../../helpers/habitsHelpers'; // Asegúrate de importar la función para eliminar

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

  const handleDelete = async (habitId?: string) => {
    if (!habitId) return; // Verificación para evitar errores si habitId es undefined

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative">
      <h2
        onClick={toggleOpen}
        className="text-xl font-semibold mb-4"
      >
        {habit.name}
      </h2>
      {isOpen && (
        <div className="mt-2">
          <p>Comienzo: {habit.startDate}</p>
          <p>Frecuencia: {habit.frequency}</p>
          <p>Recordatorio: {habit.reminderTime || 'No configurado'}</p>
        </div>
      )}
      {/* Ícono de la papelera para eliminar */}
      <button
        onClick={() => onDelete(habit.id)} // Verificación previa hecha en handleDelete
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default MyHabits;



