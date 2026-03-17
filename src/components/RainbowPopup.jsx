import React from "react";

const RainbowPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

      {/* Popup Card */}
      <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600 animate-pulse">

        <div className="bg-white rounded-2xl p-10 w-96 text-center shadow-2xl">

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            AI Voice CRM
          </h2>

          <p className="text-gray-600 mb-6">
            {message}
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default RainbowPopup;