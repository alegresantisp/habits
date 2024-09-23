// helpers/habitsHelpers.ts

import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc   } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import Habit from '../interfaces/IHabit'

// Obtener hábitos de Firestore
export const getHabits = async (): Promise<Habit[]> => {
  const habitsCollection = collection(db, 'habits');
  const habitSnapshot = await getDocs(habitsCollection);
  const habitList = habitSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate || null,
      frequency: data.frequency,
      reminderTime: data.reminderTime || null,
      userId: data.userId,
      isCompleted: data.isCompleted || [], // Asegúrate de que sea un arreglo
      streakCount: data.streakCount || 0,  // Asegúrate de que sea un número
    };
  });
  return habitList;
};

  
  export const addHabit = async (habit: Habit) => {
    try {
      const docRef = await addDoc(collection(db, 'habits'), habit);
      console.log('Hábito añadido con ID: ', docRef.id);
    } catch (e) {
      console.error('Error añadiendo el hábito: ', e);
    }
  };

  // Eliminar un hábito
export const deleteHabit = async (habitId: string) => {
    try {
      const habitDocRef = doc(db, 'habits', habitId);
      await deleteDoc(habitDocRef);
      console.log(`Hábito con ID ${habitId} eliminado.`);
    } catch (e) {
      console.error('Error eliminando el hábito: ', e);
    }
  };

  export const updateHabit = async (habitId: string, updatedFields: Partial<Habit>) => {
    try {
      const habitDocRef = doc(db, 'habits', habitId);
      await updateDoc(habitDocRef, updatedFields);
      console.log(`Hábito con ID ${habitId} actualizado.`);
    } catch (error) {
      console.error('Error actualizando el hábito', error);
    }
  };

  