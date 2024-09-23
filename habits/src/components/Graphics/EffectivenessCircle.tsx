'use client';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHabitContext } from '../Context/HabitContext';

const EffectivenessCircle: React.FC = () => {
  const { habits } = useHabitContext();

  const totalHabits = habits.length;
  const totalCompletedHabits = habits.reduce((acc, habit) => {
    const totalDays = habit.isCompleted?.length || 0;
    const completedDays = habit.isCompleted?.filter(Boolean).length || 0;
    return acc + (totalDays > 0 ? (completedDays / totalDays) : 0);
  }, 0);

  const effectiveness = (totalCompletedHabits / totalHabits) * 100;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Porcentaje de Efectividad</h2>
      <div style={{ width: '200px', margin: '0 auto' }}>
        <CircularProgressbar
          value={effectiveness}
          text={`${Math.round(effectiveness)}%`}
          styles={buildStyles({
            textColor: "#333",
            pathColor: effectiveness > 50 ? "#4caf50" : "#ff5252",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

export default EffectivenessCircle;
