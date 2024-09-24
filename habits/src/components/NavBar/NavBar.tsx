// components/Navbar.tsx
'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt  } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Image from 'next/image';


const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const authContext = useContext(AuthContext);

  // Verifica que el contexto no sea undefined
  if (authContext === undefined) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, signOut } = authContext;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="block inset-y-0 left-0  items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between sm:items-stretch">
          <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://res.cloudinary.com/dhli2ym3v/image/upload/v1727195795/HT_kn4k1w.jpg"
                  alt="Logo de SAS HT"
                  width={32} // Ajusta el ancho según sea necesario
                  height={32} // Ajusta la altura según sea necesario
                  className="rounded" // Puedes añadir clases para el estilo
                />
                <Link href="/explanation" className="text-2xl font-bold items-center">SAS HT</Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 ml-auto">
              <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About Us
              </Link>
              {user ? (
                <>
                <Link href="/landing" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <MdOutlineDashboardCustomize  className="inline mr-1" />
                 </Link>
                 <Link href="/landing" className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    Hola, {user.displayName || 'Usuario'}
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <FaSignOutAlt className="inline mr-1" />
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <FaUser className="inline mr-1" />
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            About Us
          </Link>
          {user ? (
            <>
             
              <Link href="/landing" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="text-gray-300 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <FaSignOutAlt className="inline mr-1" />
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <FaUser className="inline mr-1" />
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

