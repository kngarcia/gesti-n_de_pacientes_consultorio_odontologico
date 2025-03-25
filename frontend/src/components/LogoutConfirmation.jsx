import React from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Cerrar sesión</h2>
      <p className="mb-6 text-gray-600">¿Estás seguro de que deseas cerrar sesión?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Sí, cerrar sesión
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmation;