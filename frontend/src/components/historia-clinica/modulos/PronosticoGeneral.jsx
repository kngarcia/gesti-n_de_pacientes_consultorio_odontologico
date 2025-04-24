import React, { useState } from 'react';

// Lista de dientes (FDI)
const listaDientesFDI = [
  '11','12','13','14','15','16','17','18',
  '21','22','23','24','25','26','27','28',
  '31','32','33','34','35','36','37','38',
  '41','42','43','44','45','46','47','48'
];

// Lista de ubicaciones posibles
const listaUbicaciones = [
  'Superior Derecho',
  'Superior Izquierdo',
  'Inferior Derecho',
  'Inferior Izquierdo'
];

const PronosticoGeneral = ({ onBack }) => {
  const [MostrarAnalisisOclusionAtm, setMostrarAnalisisOclusionAtm] = useState(false);

  const [formData, setFormData] = useState({
    // Pronósticos Específicos (varios dientes)
    pronosticosEspecificos: [
      { diente: '', ubicacion: '', pronostico: '', tipoAlteracion: '' }
    ],

    // Alteraciones Periodontales
    movilidad: 'No',
    placaBlanda: 'No',
    placaCalcificada: 'No',
    sangrado: 'No',
    retraccionGingival: 'No',

    // Alteraciones Pulpares
    pulparCambioColor: '',
    pulparFistula: '',
    pulparSintomatologia: '', // "sintomatico" o "asintomatico"
    pulparObservaciones: '',

    // Observaciones generales
    observaciones: ''
  });

  // Maneja cambios de campos simples (no arrays)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja cambios en pronósticos específicos
  const handlePronosticoEspecificoChange = (index, e) => {
    const { name, value } = e.target;
    const newPronosticos = [...formData.pronosticosEspecificos];
    newPronosticos[index][name] = value;
    setFormData({ ...formData, pronosticosEspecificos: newPronosticos });
  };

  // Agregar pronóstico extra
  const agregarPronostico = () => {
    setFormData({
      ...formData,
      pronosticosEspecificos: [
        ...formData.pronosticosEspecificos,
        { diente: '', ubicacion: '', pronostico: '', tipoAlteracion: '' }
      ]
    });
  };

  // Eliminar pronóstico
  const removerPronostico = (index) => {
    const newPronosticos = [...formData.pronosticosEspecificos];
    newPronosticos.splice(index, 1);
    setFormData({ ...formData, pronosticosEspecificos: newPronosticos });
  };

  // Filas “Sí/No” para alteraciones periodontales
  const createPeriodontalRow = (label, name) => (
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos Pronóstico y Alteraciones:', formData);
    // Lógica de guardado o redirección
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
          Alteraciones y Pronóstico  
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Alteraciones en 2 columnas: Periodontales y Pulpares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Columna Izquierda: Periodontales */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Alteraciones Periodontales
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-gray-700 font-semibold text-left w-1/2">
                      Condición
                    </th>
                    <th className="py-2 px-3 text-gray-700 font-semibold text-center w-1/4">
                      Sí
                    </th>
                    <th className="py-2 px-3 text-gray-700 font-semibold text-center w-1/4">
                      No
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createPeriodontalRow('Movilidad', 'movilidad')}
                  {createPeriodontalRow('Placa Blanda', 'placaBlanda')}
                  {createPeriodontalRow('Placa Calcificada', 'placaCalcificada')}
                  {createPeriodontalRow('Sangrado', 'sangrado')}
                  {createPeriodontalRow('Retracción Gingival', 'retraccionGingival')}
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna Derecha: Pulpares */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Alteraciones Pulpares
            </h3>
            {/* CAMBIO DE COLOR */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Cambio de Color
              </label>
              <input
                type="text"
                name="pulparCambioColor"
                value={formData.pulparCambioColor}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Ej: Oscurecimiento..."
              />
            </div>
            {/* FÍSTULA */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Fístula
              </label>
              <input
                type="text"
                name="pulparFistula"
                value={formData.pulparFistula}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Ej: Fístula presente..."
              />
            </div>
            {/* Sintomático / Asintomático */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Sintomatología
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-1 text-gray-700">
                  <input
                    type="radio"
                    name="pulparSintomatologia"
                    value="sintomatico"
                    checked={formData.pulparSintomatologia === 'sintomatico'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">Sintomático</span>
                </label>
                <label className="flex items-center space-x-1 text-gray-700">
                  <input
                    type="radio"
                    name="pulparSintomatologia"
                    value="asintomatico"
                    checked={formData.pulparSintomatologia === 'asintomatico'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">Asintomático</span>
                </label>
              </div>
            </div>
            {/* Observaciones Pulpares */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Observaciones Pulpares
              </label>
              <textarea
                name="pulparObservaciones"
                rows="3"
                value={formData.pulparObservaciones}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notas adicionales sobre la pulpa..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Observaciones Generales (opcional) + Pronóstico Específico */}
        <div>
          {/* Pronóstico Específico */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pronóstico Específico
            </h3>
  
            {formData.pronosticosEspecificos.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mb-4">
                
                {/* Select Diente */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Diente
                  </label>
                  <select
                    name="diente"
                    value={item.diente}
                    onChange={(e) => handlePronosticoEspecificoChange(index, e)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {listaDientesFDI.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
  
                {/* Select Ubicación */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <select
                    name="ubicacion"
                    value={item.ubicacion}
                    onChange={(e) => handlePronosticoEspecificoChange(index, e)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {listaUbicaciones.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Nuevo campo: Tipo de Alteración */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Tipo de Alteración
                  </label>
                  <select
                    name="tipoAlteracion"
                    value={item.tipoAlteracion}
                    onChange={(e) => handlePronosticoEspecificoChange(index, e)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    <option value="periodontal">Periodontal</option>
                    <option value="pulpar">Pulpar</option>
                    <option value="periodontal y pulpar">Periodontal y Pulpar</option>
                  </select>
                </div>
  
                {/* Pronóstico */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Pronóstico
                  </label>
                  <input
                    type="text"
                    name="pronostico"
                    value={item.pronostico}
                    onChange={(e) => handlePronosticoEspecificoChange(index, e)}
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Favorable / Reservado..."
                  />
                </div>
  
                {/* Botón Eliminar si hay más de 1 pronóstico */}
                {formData.pronosticosEspecificos.length > 1 && (
                  <div className="col-span-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removerPronostico(index)}
                      className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
  
            {/* Botón para agregar otro pronóstico */}
            <button
              type="button"
              onClick={agregarPronostico}
              className="text-sm px-4 py-2 rounded bg-green-100 text-green-700 hover:bg-green-200"
            >
              + Agregar Otro Pronóstico
            </button>
          </div>

          <label className="block text-gray-700 font-semibold mb-2">
            Observaciones Generales
          </label>
          <textarea
            name="observaciones"
            rows="3"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Ingresa cualquier observación adicional..."
            className="w-full max-w-2xl border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            type="button"
            onClick={() => setMostrarAnalisisOclusionAtm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PronosticoGeneral;