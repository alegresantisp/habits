'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaBookOpen } from 'react-icons/fa';
import { GiLoveMystery } from 'react-icons/gi';
import { AiFillThunderbolt } from 'react-icons/ai';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChildReaching } from 'react-icons/fa6';

// Contenido de los acordeones
const content = [
  "Habit Tracker te ayuda a seguir tus hábitos de forma efectiva, permitiéndote establecer metas y hacer un seguimiento de tu progreso.",
  "Mantener hábitos saludables contribuye a mejorar tu calidad de vida, aumentando tu energía y manteniendo un equilibrio mental.",
  "Registra tus hábitos, establece metas y observa las métricas.",
  "Conecta contigo mismo, apoyate y motivate a alcanzar tus metas."
];

// Títulos para los acordeones
const titles = [
  "¿Qué es Habit Tracker?",
  "Beneficios de los hábitos saludables",
  "¿Cómo funciona?",
  "Tu Habit Tracker"
];

// Iconos correspondientes a cada acordeón
const icons = [
  <FaBookOpen key="1" size={30} className="mr-2" />,
  <FaChildReaching key="2" size={30} className="mr-2" />,
  <GiLoveMystery key="3" size={30} className="mr-2" />,
  <AiFillThunderbolt key="4" size={30} className="mr-2" />
];

// Componente de la página About
const About = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center overflow-hidden py-20 bg-gray-50 min-h-screen"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dhli2ym3v/image/upload/v1727192137/3cc29d9e5a5975b7edab12c76cb6c34f_vwvdu2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.8' // Opcional: Ajustar la opacidad
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-violet-600">¿Qué es Habit Tracker?</h1>

      {/* Carrusel de hábitos */}
      <div className="w-full max-w-2xl mb-10">
        <Slider {...settings}>
          <div>
            <Image
              src="https://res.cloudinary.com/dhli2ym3v/image/upload/v1724254267/cld-sample-3.jpg"
              alt="Hábito 1"
              width={300}
              height={200}
              className="object-cover"
            />
            <h3 className="text-lg font-semibold text-center mt-2">Jugá</h3>
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/dhli2ym3v/image/upload/v1724254267/cld-sample.jpg"
              alt="Hábito 2"
              width={300}
              height={200}
              className="object-cover"
            />
            <h3 className="text-lg font-semibold text-center mt-2">Amigáte</h3>
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/dhli2ym3v/image/upload/v1724254267/samples/cup-on-a-table.jpg"
              alt="Hábito 3"
              width={300}
              height={200}
              className="object-cover"
            />
            <h3 className="text-lg font-semibold text-center mt-2">Cuidáte</h3>
          </div>
        </Slider>
      </div>

      {/* Acordeones */}
      <div className="flex flex-col items-center">
        {titles.map((title, index) => (
          <div key={index} className="mb-4 w-full max-w-md">
            <div
              onClick={() => handleToggle(index)}
              className="flex items-center p-4 bg-green-500 text-white rounded cursor-pointer"
            >
              {icons[index]}
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            {activeIndex === index && (
              <div className="p-4 bg-blue-100 rounded mt-2">
                <p>{content[index]}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Citas Inspiradoras */}
      <div className="mt-10 p-6 bg-blue-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Citas</h2>
        <blockquote className="italic text-center">
          El éxito es la suma de pequeños esfuerzos repetidos día tras día.
        </blockquote>
        <blockquote className="italic text-center mt-4">
          No cuentes los días, haz que los días cuenten.
        </blockquote>
      </div>
    </div>
  );
};

export default About;

