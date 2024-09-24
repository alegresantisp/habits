// helpers/habitsHelpers.ts

import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where   } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import Habit from '../interfaces/IHabit'

// Obtener hábitos de Firestore
export const getHabits = async (userId: string): Promise<Habit[]> => {
  const habitsCollection = collection(db, 'habits');
  const q = query(habitsCollection, where('userId', '==', userId)); 
  const querySnapshot = await getDocs(q);
  
  const habitList: Habit[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    startDate: doc.data().startDate,
    endDate: doc.data().endDate || null,
    frequency: doc.data().frequency,
    reminderTime: doc.data().reminderTime || null,
    userId: doc.data().userId,
    isCompleted: doc.data().isCompleted || [],
    streakCount: doc.data().streakCount || 0,
  })) as Habit[];

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

  