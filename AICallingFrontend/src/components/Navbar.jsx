import React from "react";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      <div className="w-16 flex justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-600 hover:text-blue-600 transition"
        >
          ☰
        </button>
      </div>

      <div className="text-4xl font-bold text-blue-600 text-center flex-1">
        AI Calling Team
      </div>

      <div className="flex items-center space-x-6 text-2xl w-16 justify-end">
        <div className="text-gray-500 hover:text-blue-600 cursor-pointer transition">
          🔔
        </div>
        <div className="text-gray-500 hover:text-blue-600 cursor-pointer transition">
          👤
        </div>
      </div>

    </div>
  );
};

export default Navbar;