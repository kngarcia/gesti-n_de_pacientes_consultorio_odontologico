import React from 'react';
import RadioGroup from './RadioGroup';

const AlteracionesPulpares = ({ data, onChange, readOnly }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Alteraciones Pulpares</h3>

      {readOnly ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos visuales de solo lectura */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded">
            <strong className="text-gray-700">Cambio de Color:</strong>
            <p className="text-gray-800 mt-1">{data.cambio_color || 'No especificado'}</p>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded">
            <strong className="text-gray-700">Fístula:</strong>
            <p className="text-gray-800 mt-1">{data.fistula || 'No especificado'}</p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <strong className="text-gray-700">Sintomático:</strong>
            <p className="text-gray-800 mt-1">{data.sintomatico || 'No'}</p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <strong className="text-gray-700">Asintomático:</strong>
            <p className="text-gray-800 mt-1">{data.asintomatico || 'No'}</p>
          </div>

          {/* Observaciones */}
          {data.observaciones && (
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Observaciones</label>
              <p className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 whitespace-pre-line">
                {data.observaciones}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos de entrada */}
          <div>
            <label className="block text-gray-700 mb-1">Cambio de Color</label>
            <input
              type="text"
              value={data.cambio_color || ''}
              onChange={(e) => onChange('cambio_color', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ej: Oscurecimiento..."
              readOnly={readOnly}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Fístula</label>
            <input
              type="text"
              value={data.fistula || ''}
              onChange={(e) => onChange('fistula', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ej: Fístula presente..."
              readOnly={readOnly}
            />
          </div>

          {/* Radio buttons */}
          <RadioGroup
            label="Sintomático"
            name="sintomatico"
            value={data.sintomatico || 'No'}
            options={['Si', 'No']}
            onChange={(name, value) => onChange(name, value)}
            readOnly={readOnly}
          />

          <RadioGroup
            label="Asintomático"
            name="asintomatico"
            value={data.asintomatico || 'No'}
            options={['Si', 'No']}
            onChange={(name, value) => onChange(name, value)}
            readOnly={readOnly}
          />

          {/* Observaciones */}
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
      )}
    </div>
  );
};

export default AlteracionesPulpares;
