'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';

interface Habit {
  id: number;
  name: string;
  benefits: string;
  tips: string;
}

const habits: Habit[] = [
  { 
    id: 1, 
    name: 'Beber agua 💧', 
    benefits: 'Hidrata tu cuerpo y mejora la función cognitiva.',
    tips: 'Intenta llevar siempre contigo una botella de agua para recordar beber suficiente agua a lo largo del día.' 
  },
  { 
    id: 2, 
    name: 'Ejercicio diario 🏋️‍♂️', 
    benefits: 'Aumenta tu energía y mejora tu estado de ánimo.',
    tips: 'Empieza con 10 minutos al día y aumenta gradualmente. Encuentra una actividad que disfrutes.' 
  },
  { 
    id: 3, 
    name: 'Meditar 🧘‍♀️', 
    benefits: 'Reduce el estrés y mejora la concentración.',
    tips: 'Dedica 5 minutos al día en un lugar tranquilo. Usa aplicaciones de meditación para guiarte.' 
  },
  { 
    id: 4, 
    name: 'Leer 📚', 
    benefits: 'Estimula la mente y mejora el conocimiento.',
    tips: 'Establece un objetivo de lectura diario, como 10 páginas o 20 minutos.' 
  },
  { 
    id: 5, 
    name: 'Dormir bien 😴', 
    benefits: 'Repara el cuerpo y mejora la memoria.',
    tips: 'Crea una rutina nocturna para ayudarte a relajarte antes de dormir.' 
  },
  { 
    id: 6, 
    name: 'Comer saludable 🥗', 
    benefits: 'Proporciona nutrientes esenciales y energía.',
    tips: 'Planifica tus comidas y snacks para evitar tentaciones poco saludables.' 
  },
  { 
    id: 7, 
    name: 'Escribir un diario 📓', 
    benefits: 'Ayuda a procesar emociones y reflexionar.',
    tips: 'Dedica unos minutos cada día para escribir sobre tus pensamientos y experiencias.' 
  },
  { 
    id: 8, 
    name: 'Practicar gratitud 🙏', 
    benefits: 'Mejora la salud mental y aumenta la felicidad.',
    tips: 'Escribe tres cosas por las que estés agradecido cada día.' 
  },
  { 
    id: 9, 
    name: 'Desconectar de pantallas 📵', 
    benefits: 'Reduce la fatiga ocular y mejora el sueño.',
    tips: 'Establece horarios sin dispositivos y disfruta de actividades offline.' 
  },
  { 
    id: 10, 
    name: 'Socializar 🤝', 
    benefits: 'Fortalece las relaciones y mejora el bienestar.',
    tips: 'Haz un esfuerzo consciente por conectarte con amigos y familiares regularmente.' 
  },
];

const HabitsToKnow: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  
    const openModal = (habit: Habit) => {
      setSelectedHabit(habit);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedHabit(null);
    };
  
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 mt-5 text-gray-300 text-center opacity-80">Hábitos para Considerar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 ">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 transition text-center text-gray-600 opacity-90"
              onClick={() => openModal(habit)}
            >
              {habit.name}
            </div>
          ))}
        </div>
  
        <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal} 
            style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                zIndex: 1000, 
                },
                content: {
                backgroundColor: '#1a1a1a', 
                color: 'white',
                padding: '20px',
                borderRadius: '15px', 
                position: 'relative', 
                zIndex: 1001, 
                maxWidth: '70%', 
                maxHeight: '80%', 
                overflowY: 'auto', 
                margin: 'auto', 
                },
            }}
            >
            <span onClick={closeModal} className="absolute top-4 right-4 cursor-pointer text-white text-2xl">&times;</span>
            <h2 className="text-xl font-semibold mb-2 text-center">{selectedHabit?.name}</h2>
            <p className="text-center mb-4">{selectedHabit?.benefits}</p>
            <p className="text-center mb-2">{selectedHabit?.tips}</p>
            </Modal>
      </div>
    );
  };
  
  export default HabitsToKnow;