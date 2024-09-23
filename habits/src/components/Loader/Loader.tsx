import React from 'react';

const Loader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-700 opacity-50">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 border-t-4 border-transparent"></div>
  </div>
);

export default Loader;
