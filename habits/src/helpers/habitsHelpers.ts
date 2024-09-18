// helpers/abitsHelpers.ts

import { collection, getDocs, addDoc  } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

// Obtener hábitos de Firestore
export const getHabits = async () => {
  const habitsCollection = collection(db, 'habits');
  const habitSnapshot = await getDocs(habitsCollection);
  const habitList = habitSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return habitList;
};

// Agregar un nuevo hábito
interface Habit {
    name: string;
    userId: string; // Asegúrate de que el habit tenga un userId
  }
  
  export const addHabit = async (habit: Habit) => {
    try {
      const docRef = await addDoc(collection(db, 'habits'), habit);
      console.log('Hábito añadido con ID: ', docRef.id);
    } catch (e) {
      console.error('Error añadiendo el hábito: ', e);
    }
  };