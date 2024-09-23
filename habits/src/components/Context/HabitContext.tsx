'use client'

// components/context/HabitContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHabits } from '../../helpers/habitsHelpers';
import Habit from '@/interfaces/IHabit';

interface HabitContextType {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
    refreshHabits: () => Promise<void>;
  }

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const refreshHabits = async () => {
    const fetchedHabits = await getHabits();
    setHabits(fetchedHabits);
  };

  useEffect(() => {
    refreshHabits(); 
  }, []);

  return (
    <HabitContext.Provider value={{ habits, setHabits, refreshHabits  }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }
  return context;
};
