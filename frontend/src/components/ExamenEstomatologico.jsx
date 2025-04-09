import React, { useState } from 'react';
import PronosticoAlteraciones from './PronosticoAlteraciones';
import { useNavigate } from "react-router-dom";

const ExamenEstomatologico = ({ onBack }) => {
  const navigate = useNavigate();
  const [MostrarPronosticoAlteraciones, setMostrarPronosticoAlteraciones] = useState(false);
  const [formData, setFormData] = useState({
    // Músculos masticadores
    musculosMasticadores: '', // sintomático / asintomático
    observaciones_musculosMasticadores: '', // Observaciones

    // Labios
    labios_herpes: 'No',
    labios_queilitis: 'No',
    labios_mucocele: 'No',
    labios_frenilloHipertrofico: 'No',
    labios_leucoplasia: 'No',
    labios_otro: '',

    // Lengua
    lengua_macroglosia: 'No',
    lengua_microglosia: 'No',
    lengua_geografica: 'No',
    lengua_fisurada: 'No',
    lengua_saburral: 'No',
    lengua_otro: '',

    // Mejillas
    mejillas_aftas: 'No',
    mejillas_herpes: 'No',
    mejillas_liquen_plano: 'No',
    mejillas_otro: '',

    // Paladar
    paladar_ojival: 'No',
    paladar_fisurado: 'No',
    paladar_torusPalatino: 'No',
    paladar_palatitisProtesica: 'No',
    paladar_otro: '',

    // Piso de boca
    piso_mucocele: 'No',
    piso_ranula: 'No',
    piso_leucoplasia: 'No',
    piso_aftas: 'No',
    piso_otro: '',

    // Maxilares
    maxilares_macrognasia: 'No',
    maxilares_micrognasia: 'No',
    maxilares_torusMandibular: 'No',
    maxilares_otro: ''
  });

  // Manejo de cambios en formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper para renderizar una sección con radios Sí/No
  const createSection = (title, items) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map(([label, name]) => (
          <div key={name} className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">{label}</span>
            <div className="flex gap-4">
              {/* Radio Sí */}
              <label className="flex items-center space-x-1 text-gray-700">
                <input
                  type="radio"
                  name={name}
                  value="Si"
                  checked={formData[name] === 'Si'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                />
                <span className="text-sm">Sí</span>
              </label>
              {/* Radio No */}
              <label className="flex items-center space-x-1 text-gray-700">
                <input
                  type="radio"
                  name={name}
                  value="No"
                  checked={formData[name] === 'No'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Manejo del submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos Examen Estomatológico:', formData);
    // Aquí tu lógica de guardado o envío
  };

  // Renderizado condicional para mostrar PronosticoAlteraciones
  if (MostrarPronosticoAlteraciones) {
    return < PronosticoAlteraciones onBack={() => setMostrarPronosticoAlteraciones(false)} />;
  }

  return (
    <div className="w-full min-h-screen p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-8">
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
            Volver
          </button>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          Examen Estomatológico
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Músculos Masticadores */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Músculos Masticadores
          </h3>
          <div className="flex gap-6 flex-wrap items-center mb-4">
            <label className="flex items-center space-x-1 text-gray-700">
              <input
                type="radio"
                name="musculosMasticadores"
                value="sintomatico"
                checked={formData.musculosMasticadores === 'sintomatico'}
                onChange={handleChange}
                className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
              />
              <span className="text-sm">Sintomático</span>
            </label>
            <label className="flex items-center space-x-1 text-gray-700">
              <input
                type="radio"
                name="musculosMasticadores"
                value="asintomatico"
                checked={formData.musculosMasticadores === 'asintomatico'}
                onChange={handleChange}
                className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
              />
              <span className="text-sm">Asintomático</span>
            </label>
          </div>
          {/* NUEVO: Observaciones Músculos Masticadores */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="observaciones_musculosMasticadores">
              Observaciones
            </label>
            <textarea
              id="observaciones_musculosMasticadores"
              name="observaciones_musculosMasticadores"
              value={formData.observaciones_musculosMasticadores}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="2"
              placeholder="Escriba observaciones adicionales sobre músculos masticadores..."
            />
          </div>
        </div>

        {/* 1) Labios - Lengua en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
          {/* Columna 1: Labios */}
          <div>
            {createSection('Labios', [
              ['Herpes', 'labios_herpes'],
              ['Queilitis Angular', 'labios_queilitis'],
              ['Mucocele', 'labios_mucocele'],
              ['Frenillo Hipertrof.', 'labios_frenilloHipertrofico'],
              ['Leucoplasia', 'labios_leucoplasia']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"></label>
              <input
                type="text"
                name="labios_otro"
                value={formData.labios_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>

          {/* Columna 2: Lengua */}
          <div>
            {createSection('Lengua', [
              ['Macroglosia', 'lengua_macroglosia'],
              ['Microglosia', 'lengua_microglosia'],
              ['Geográfica', 'lengua_geografica'],
              ['Fisurada', 'lengua_fisurada'],
              ['Saburral', 'lengua_saburral']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"> </label>
              <input
                type="text"
                name="lengua_otro"
                value={formData.lengua_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>
        </div>

        {/* 2) Paladar - Mejillas en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
          {/* Columna 1: Paladar */}
          <div>
            {createSection('Paladar', [
              ['Ojival', 'paladar_ojival'],
              ['Fisurado', 'paladar_fisurado'],
              ['Torus Palatino', 'paladar_torusPalatino'],
              ['Palatitis Protésica', 'paladar_palatitisProtesica']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"></label>
              <input
                type="text"
                name="paladar_otro"
                value={formData.paladar_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>

          {/* Columna 2: Mejillas */}
          <div>
            {createSection('Mejillas', [
              ['Aftas', 'mejillas_aftas'],
              ['Herpes', 'mejillas_herpes'],
              ['Liquen Plano', 'mejillas_liquen_plano']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"></label>
              <input
                type="text"
                name="mejillas_otro"
                value={formData.mejillas_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>
        </div>

        {/* 3) Piso de Boca - Maxilares en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna 1: Piso de Boca */}
          <div>
            {createSection('Piso de Boca', [
              ['Mucocele', 'piso_mucocele'],
              ['Ránula', 'piso_ranula'],
              ['Leucoplasia', 'piso_leucoplasia'],
              ['Aftas', 'piso_aftas']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"></label>
              <input
                type="text"
                name="piso_otro"
                value={formData.piso_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>

          {/* Columna 2: Maxilares */}
          <div>
            {createSection('Maxilares', [
              ['Macrognasia', 'maxilares_macrognasia'],
              ['Micrognasia', 'maxilares_micrognasia'],
              ['Torus Mandibular', 'maxilares_torusMandibular']
            ])}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1"></label>
              <input
                type="text"
                name="maxilares_otro"
                value={formData.maxilares_otro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Especificar otra condición..."
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-8 border-t mt-6">
          {onBack && (
            <button
              type="button"
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={onBack}
            >
              Atrás
            </button>
          )}
          <button
            type="button"
            onClick={() => setMostrarPronosticoAlteraciones(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Siguiente
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default ExamenEstomatologico;
