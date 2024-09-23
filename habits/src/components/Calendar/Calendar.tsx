'use client'
import React, {  useState } from 'react';
import {  updateHabit } from '../../helpers/habitsHelpers';
import Habit from '../../interfaces/IHabit';
import { useHabitContext } from '../Context/HabitContext';

const Calendar: React.FC = () => {
    const { habits, setHabits } = useHabitContext();
  const [expandedHabit, setExpandedHabit] = useState<string | null>(null);


  const handleCheckboxChange = async (habitId: string, index: number) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const updatedIsCompleted = [...habit.isCompleted!];
        updatedIsCompleted[index] = !updatedIsCompleted[index];
        return { ...habit, isCompleted: updatedIsCompleted };
      }
      return habit;
    });
    setHabits(updatedHabits); 

    const habitToUpdate = updatedHabits.find(habit => habit.id === habitId);
    if (habitToUpdate) {
      await updateHabit(habitId, { isCompleted: habitToUpdate.isCompleted });
    }
  };

  const renderCheckboxes = (habit: Habit) => {
    const frequency = habit.frequency.toLowerCase();
    const checkboxes: JSX.Element[] = [];
    const startDate = new Date(habit.startDate);
    const endDate = habit.endDate ? new Date(habit.endDate) : new Date();
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  
    const today = new Date();
    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      if (currentDay < today && (habit.isCompleted?.[i] === undefined)) {
        habit.isCompleted![i] = false;
      }
    }

    if (frequency === 'daily') {
      for (let i = 0; i < totalDays; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        checkboxes.push(
          <div key={i} className="flex items-center mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={habit.isCompleted?.[i] || false}
                onChange={() => handleCheckboxChange(habit.id!, i)}
                className="hidden"
              />
              <span className={`w-5 h-5 flex items-center justify-center border-2 border-green-500 rounded mr-2 transition duration-200 ease-in-out ${habit.isCompleted?.[i] ? 'bg-green-500' : 'bg-white'}`}>
                {habit.isCompleted?.[i] && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {currentDay.toLocaleDateString()}
            </label>
          </div>
        );
      }
    } else if (frequency === 'weekly') {
      const totalWeeks = Math.ceil(totalDays / 7);
      for (let week = 0; week < totalWeeks; week++) {
        checkboxes.push(
          <div key={week} className="flex items-center mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={habit.isCompleted?.[week] || false}
                onChange={() => handleCheckboxChange(habit.id!, week)}
                className="hidden"
              />
              <span className={`w-5 h-5 flex items-center justify-center border-2 border-green-500 rounded mr-2 transition duration-200 ease-in-out ${habit.isCompleted?.[week] ? 'bg-green-500' : 'bg-white'}`}>
                {habit.isCompleted?.[week] && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {`Semana ${week + 1}`}
            </label>
          </div>
        );
      }
    } else if (frequency === 'monthly') {
      for (let i = 1; i <= 31; i++) {
        checkboxes.push(
          <div key={i} className="flex items-center mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={habit.isCompleted?.[i - 1] || false}
                onChange={() => handleCheckboxChange(habit.id!, i - 1)}
                className="hidden"
              />
              <span className={`w-5 h-5 flex items-center justify-center border-2 border-green-500 rounded mr-2 transition duration-200 ease-in-out ${habit.isCompleted?.[i - 1] ? 'bg-green-500' : 'bg-white'}`}>
                {habit.isCompleted?.[i - 1] && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {`${i} de ${new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(startDate)}`}
            </label>
          </div>
        );
      }
    }

    return checkboxes;
  };

  const toggleHabitExpansion = (habitId: string) => {
    setExpandedHabit(expandedHabit === habitId ? null : habitId);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg shadow-lg">
      {habits.length > 0 ? (
        habits.map(habit => (
          <div key={habit.id} className="habit mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <h3 
              className="text-xl font-bold mb-3 text-green-800 cursor-pointer"
              onClick={() => toggleHabitExpansion(habit.id!)}
            >
              {habit.name}
            </h3>
            {expandedHabit === habit.id && renderCheckboxes(habit)}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay hábitos disponibles.</p>
      )}
    </div>
  );
};

export default Calendar;

