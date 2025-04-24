// VistaExamenClinico.jsx
import React from 'react';
import { SECTION_LABELS, FIELD_LABELS } from './examenClinicoConstants';

const VistaExamenClinico = ({ datos, onEdit}) => {
  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') return 'No registrado';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (value === 'Si' || value === 'No') return value;
    return value.toString();
  };

  // ExtraOral data and IntraOral subsections
  const extra = datos.ExtraOral;
  const intra = {
    Mucosas: datos.Mucosas,
    Encias: datos.Encias,
    Textura: datos.Textura,
    TejidosDuros: datos.TejidosDuros,
    Observaciones: datos.Observaciones
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Examen Clínico</h2>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Examen Extraoral */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
          {SECTION_LABELS.ExtraOral}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(extra)
            .filter(([f]) => !f.startsWith('id_'))
            .map(([field, value]) => (
              <div key={field} className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  {FIELD_LABELS[field] || field.replace(/_/g, ' ')}
                </label>
                <div className="text-gray-800 p-2 bg-white rounded">
                  {formatValue(value)}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Examen Intraoral */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{SECTION_LABELS.IntraOral}</h3>
        {Object.entries(intra).map(([sectionKey, fields]) => (
          <div
            key={sectionKey}
            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              {SECTION_LABELS[sectionKey]}
            </h4>
            {sectionKey === 'Observaciones' ? (
              <p className="text-gray-600">{formatValue(fields.observaciones)}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(fields)
                  .filter(([f]) => !f.startsWith('id_'))
                  .map(([field, value]) => (
                    <div key={field} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-500">
                        {FIELD_LABELS[field] || field.replace(/_/g, ' ')}
                      </label>
                      <div className="text-gray-800 p-2 bg-white rounded">
                        {formatValue(value)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaExamenClinico;