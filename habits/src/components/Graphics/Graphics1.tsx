'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Habit from '../../interfaces/IHabit';

interface Graphics1Props {
  habits: Habit[];
}

const Graphics1: React.FC<Graphics1Props> = ({ habits }) => {
  const completedData = habits.map(habit => {
    const completedDays = Array.isArray(habit.isCompleted) 
      ? habit.isCompleted.filter(Boolean).length 
      : 0;

    return {
      name: habit.name,
      completedDays,
    };
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Días Completados por Hábito</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={completedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="completedDays" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphics1;
