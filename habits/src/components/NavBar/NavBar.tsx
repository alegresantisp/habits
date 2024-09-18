// components/Navbar.tsx
'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt  } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

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
                <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12h4v8h8v-8h4V2z" fill="currentColor"/>
                </svg>
                <span className="text-2xl font-bold items-center">SAS HT</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 ml-auto">
              <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About Us
              </Link>
              {user ? (
                <>
                  <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    Hola, {user.displayName || 'Usuario'}
                  </span>
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
              <span className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                Hola, {user.displayName || 'Usuario'}
              </span>
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

