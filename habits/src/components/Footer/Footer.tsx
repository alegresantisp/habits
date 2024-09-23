import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 block">
      <div className="container mx-auto flex flex-col items-center">
        {/* Nombre y texto */}
        <p className="mb-4">Creado por Santiago Alegre</p>
        
        {/* Iconos con enlaces */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/alegresantisp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-alegre-67b288193"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;