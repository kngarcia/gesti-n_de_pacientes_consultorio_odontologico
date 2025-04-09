import React, { useState } from 'react';
import PronosticoAlteraciones from './PronosticoAlteraciones';
import { useNavigate } from "react-router-dom";

const DiagnosticoPronostico = ({ onBack }) => {
  const navigate = useNavigate();
  const [mostrarPronosticoAlteraciones, setMostrarPronosticoAlteraciones] = useState(false);

  const [formData, setFormData] = useState({
    diagnosticoGeneral: '',
    tejidosBlandos: '',
    tejidosDuros: '',
    pronosticoGeneral: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos Diagnóstico y Pronóstico:', formData);
    // Lógica adicional: guardar datos, redireccionar, etc.
  };

  if (mostrarPronosticoAlteraciones) {
    return (
      <PronosticoAlteraciones onBack={() => setMostrarPronosticoAlteraciones(false)} />
    );
  }

  return (
    <div className="w-full min-h-screen bg-white p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Atrás
          </button>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          Diagnóstico y Pronóstico
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Diagnóstico General */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Diagnóstico General
          </h3>
          <textarea
            name="diagnosticoGeneral"
            rows="3"
            value={formData.diagnosticoGeneral}
            onChange={handleChange}
            placeholder="Describe el diagnóstico general..."
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* De Tejidos Blandos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            De Tejidos Blandos
          </h3>
          <textarea
            name="tejidosBlandos"
            rows="3"
            value={formData.tejidosBlandos}
            onChange={handleChange}
            placeholder="Ingresa el diagnóstico de tejidos blandos..."
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* De Tejidos Duros */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            De Tejidos Duros
          </h3>
          <textarea
            name="tejidosDuros"
            rows="3"
            value={formData.tejidosDuros}
            onChange={handleChange}
            placeholder="Ingresa el diagnóstico de tejidos duros..."
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pronóstico General */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Pronóstico General
          </h3>
          <textarea
            name="pronosticoGeneral"
            rows="3"
            value={formData.pronosticoGeneral}
            onChange={handleChange}
            placeholder="Ingresa el pronóstico general..."
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Atrás
            </button>
          )}
          <button
            type="button"
            onClick={() => setMostrarPronosticoAlteraciones(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosticoPronostico;

