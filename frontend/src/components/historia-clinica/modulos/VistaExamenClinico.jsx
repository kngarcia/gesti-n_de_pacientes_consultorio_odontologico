import React from 'react';
import { SECTION_LABELS, FIELD_LABELS } from './examenClinicoConstants';

const VistaExamenClinico = ({ datos }) => {
  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') return 'No registrado';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (value === 'Si' || value === 'No') return value;
    return value.toString();
  };

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
      {/* Examen Extraoral */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
          {SECTION_LABELS.ExtraOral}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(extra)
            .filter(([f]) => !f.startsWith('id'))
            .map(([field, value]) => {
              const formattedValue = formatValue(value);
              return (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    {FIELD_LABELS[field] || field.replace(/_/g, ' ')}
                  </label>
                  <div className={`p-2 bg-white rounded ${
                    (formattedValue === 'Sí' || formattedValue === 'Si') 
                      ? 'text-red-600' 
                      : 'text-gray-800'
                  }`}>
                    {formattedValue}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Examen Intraoral */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{SECTION_LABELS.IntraOral}</h3>
        {Object.entries(intra).map(([sectionKey, fields]) => {
          const formattedFields = typeof fields === 'object' 
            ? fields 
            : { observaciones: fields };
          
          return (
            <div
              key={sectionKey}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6"
            >
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                {SECTION_LABELS[sectionKey]}
              </h4>
              {sectionKey === 'Observaciones' ? (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Observaciones
                  </label>
                  <p className={`p-2 bg-white rounded ${
                    formatValue(formattedFields.observaciones) === 'Sí' 
                      ? 'text-red-600' 
                      : 'text-gray-800'
                  }`}>
                    {formatValue(formattedFields.observaciones)}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formattedFields)
                    .filter(([f]) => !f.startsWith('id_'))
                    .map(([field, value]) => {
                      const formattedValue = formatValue(value);
                      return (
                        <div key={field} className="space-y-1">
                          <label className="block text-sm font-medium text-gray-500">
                            {FIELD_LABELS[field] || field.replace(/_/g, ' ')}
                          </label>
                          <div className={`p-2 bg-white rounded ${
                            (formattedValue === 'Sí' || formattedValue === 'Si') 
                              ? 'text-red-600' 
                              : 'text-gray-800'
                          }`}>
                            {formattedValue}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VistaExamenClinico;