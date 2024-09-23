'use client'
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Habit from '../../interfaces/IHabit';

interface GraphicsProps {
  habits: Habit[];
}

const Graphics: React.FC<GraphicsProps> = ({ habits }) => { 
  const completedStats = habits.map(habit => {
    const totalDays = habit.isCompleted?.length || 0;
    const completedDays = Array.isArray(habit.isCompleted) 
      ? habit.isCompleted.filter(Boolean).length 
      : 0;

    return {
      name: habit.name,
      completionRate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
    };
  });

  const data = completedStats.map(stat => ({
    name: stat.name,
    value: stat.completionRate,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tasa de Compleción de Hábitos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#4caf50' : '#ff5252'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphics;
