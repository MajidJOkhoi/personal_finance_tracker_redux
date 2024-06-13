import React from 'react';
``
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Spinner;
