import React from 'react';
import RadioGroup from './RadioGroup';

const AlteracionesPeriodontales = ({ data, onChange, readOnly }) => {
  const campos = [
    { name: 'movilidad', label: 'Movilidad' },
    { name: 'placa_blanda', label: 'Placa Blanda' },
    { name: 'placa_calcificada', label: 'Placa Calcificada' },
    { name: 'sangrado', label: 'Sangrado' },
    { name: 'retraccion_gingival', label: 'Retracción Gingival' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Alteraciones Periodontales</h3>

      {readOnly ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campos.map((campo) => (
              <div
                key={campo.name}
                className={`p-3 rounded border ${
                  data[campo.name] === 'Si'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                <strong>{campo.label}:</strong> {data[campo.name] || 'No'}
              </div>
            ))}
          </div>

          {/* Observaciones (solo si hay texto) */}
          {data.observaciones && (
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">Observaciones</label>
              <p className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 whitespace-pre-line">
                {data.observaciones}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campos.map((campo) => (
              <RadioGroup
                key={campo.name}
                label={campo.label}
                name={campo.name}
                value={data[campo.name] || 'No'}
                options={['Si', 'No']}
                onChange={(name, value) => onChange(name, value)}
                readOnly={readOnly}
              />
            ))}

            {/* Campo de observaciones (editable) */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Observaciones</label>
              <textarea
                value={data.observaciones || ''}
                onChange={(e) => onChange('observaciones', e.target.value)}
                className="w-full p-2 border rounded"
                rows="2"
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlteracionesPeriodontales;
