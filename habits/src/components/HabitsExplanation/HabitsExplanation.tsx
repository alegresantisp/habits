'use client';

import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const sections = [
  {
    id: 'whatAreHabits',
    title: '¿Qué Son los Hábitos?',
    content: `Los hábitos son comportamientos recurrentes que se realizan automáticamente en respuesta a ciertos contextos o señales. Los hábitos se forman a partir de un ciclo de señal, rutina y recompensa, y pueden ser modificados para mejorar nuestra vida.`,
  },
  {
    id: 'howHabitsWork',
    title: '¿Cómo Funcionan los Hábitos?',
    content: `Los hábitos funcionan mediante un ciclo de señal, rutina y recompensa. Una señal desencadena una rutina que, al ser completada, proporciona una recompensa. Es fundamental comprender este ciclo para poder hacer cambios efectivos en nuestros hábitos.`,
  },
  {
    id: 'importanceOfHabits',
    title: '¿Por Qué Son Importantes?',
    content: `Los hábitos son fundamentales porque son la base de nuestro comportamiento diario y pueden tener un impacto significativo en nuestro éxito personal y profesional.`,
  },
];

const HabitsExplanation = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Contenido */}
      <div className="relative p-8 min-h-screen">
        {/* Título Principal */}
        <section className="flex flex-col items-center mb-16 font-poppins">
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            Entiende los <span className="text-orange-500">Hábitos</span> para Mejorar Tu Vida
          </h1>
          <p className="text-lg text-white text-center">
            Aprende qué son los hábitos, cómo funcionan y por qué son importantes para tu desarrollo personal.
          </p>
        </section>

        {/* Secciones Expansibles */}
        <section className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => handleToggle(section.id)}
                className="w-full text-left px-6 py-4 bg-green-500 text-white font-semibold flex items-center justify-between focus:outline-none"
              >
                <span className="flex items-center">
                  <BsFillQuestionCircleFill className="mr-2 text-2xl" />
                  {section.title}
                </span>
                {expandedSection === section.id ? (
                  <FaArrowUp className="text-2xl" />
                ) : (
                  <FaArrowDown className="text-2xl" />
                )}
              </button>
              {expandedSection === section.id && (
                <div className="p-6 bg-blue-900">
                  <p className="text-white">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HabitsExplanation;
