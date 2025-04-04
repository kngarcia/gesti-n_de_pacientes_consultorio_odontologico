import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PronosticoAlteraciones from './PronosticoAlteraciones';

const AnalisisOclusionAtm = ({ onBack }) => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // PLANO FRONTAL
    frontal_mordidaAbierta: 'No',
    frontal_mordidaProfunda: 'No',
    frontal_sobremordidaVertical: 'No',
    frontal_sobremordidaHorizontal: 'No',

    // PLANO HORIZONTAL
    horizontal_mordidaCruzadaAnterior: 'No',
    horizontal_mordidaCruzadaPosterior: 'No',
    horizontal_mordidaBordeABorde: 'No',

    // ANOMALÍAS ATM
    atm_ruidoArticular: 'No',
    atm_difusionDolorosa: 'No',
    atm_limitacionApertura: 'No',

    // Observaciones
    observaciones: '',

    // Plan de Tratamiento Odontológico
    planTratamiento: ''
  });

  // Maneja el cambio de cualquier input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Genera una fila con radios “Sí/No”
  const createSiNoRow = (label, name) => (
    <tr key={name}>
      <td className="py-2 px-3 text-gray-700">{label}</td>
      <td className="py-2 px-3 text-center">
        <input
          type="radio"
          name={name}
          value="Si"
          checked={formData[name] === 'Si'}
          onChange={handleChange}
          className="form-radio h-4 w-4 border-gray-300 text-blue-600"
        />
      </td>
      <td className="py-2 px-3 text-center">
        <input
          type="radio"
          name={name}
          value="No"
          checked={formData[name] === 'No'}
          onChange={handleChange}
          className="form-radio h-4 w-4 border-gray-300 text-blue-600"
        />
      </td>
    </tr>
  );

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos Análisis de Oclusión y ATM:', formData);
    // Aquí tu lógica para guardar o navegar
  };
  const handleBack = () => {
    navigate('./PronosticoAlteraciones'); // O navigate(-1), según tu necesidad
  };

  return (
    <div className="w-full min-h-screen p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </button>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          Análisis de Oclusión y ATM
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Secciones en tres columnas: Plano Frontal, Plano Horizontal, Anomalías ATM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plano Frontal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
              Plano Frontal
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-gray-700 font-semibold w-1/2">
                      Condición
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      Sí
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      No
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createSiNoRow('Mordida Abierta', 'frontal_mordidaAbierta')}
                  {createSiNoRow('Mordida Profunda', 'frontal_mordidaProfunda')}
                  {createSiNoRow('Sobremordida Vertical', 'frontal_sobremordidaVertical')}
                  {createSiNoRow('Sobremordida Horizontal', 'frontal_sobremordidaHorizontal')}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Plano Horizontal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
              Plano Horizontal
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-gray-700 font-semibold w-1/2">
                      Condición
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      Sí
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      No
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createSiNoRow('Mordida Cruzada Anterior', 'horizontal_mordidaCruzadaAnterior')}
                  {createSiNoRow('Mordida Cruzada Posterior', 'horizontal_mordidaCruzadaPosterior')}
                  {createSiNoRow('Mordida Borde a Borde', 'horizontal_mordidaBordeABorde')}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Anomalías ATM */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
              Anomalías ATM
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-gray-700 font-semibold w-1/2">
                      Condición
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      Sí
                    </th>
                    <th className="py-2 px-3 text-center text-gray-700 font-semibold w-1/4">
                      No
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createSiNoRow('Ruido Articular', 'atm_ruidoArticular')}
                  {createSiNoRow('Difusión Dolorosa', 'atm_difusionDolorosa')}
                  {createSiNoRow('Limitación Apertura', 'atm_limitacionApertura')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            rows="3"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Ingresa observaciones adicionales..."
            className="w-full max-w-2xl border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Plan de Tratamiento Odontológico */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Plan de Tratamiento Odontológico
          </h3>
          <textarea
            name="planTratamiento"
            rows="3"
            value={formData.planTratamiento}
            onChange={handleChange}
            placeholder="Describe el plan de tratamiento..."
            className="w-full max-w-3xl border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-6 border-t">
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
            type="submit"
            className="px-5 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalisisOclusionAtm;