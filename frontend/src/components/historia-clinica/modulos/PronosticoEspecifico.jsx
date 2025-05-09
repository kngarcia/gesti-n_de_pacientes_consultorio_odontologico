import React from 'react';

const PronosticoEspecifico = ({ 
  data, 
  onAdd, 
  onChange, 
  onRemove,
  listaDientes,
  listaUbicaciones,
  readOnly 
}) => {
  const opcionesAlteracion = [
    'Periodontal', 
    'Pulpar', 
    'Oclusal', 
    'Otro'
  ];

  const opcionesPronostico = [
    'Favorable',
    'Reservado',
    'Desfavorable',
    'Dudoso'
  ];

  const coloresPronostico = {
    Favorable: "bg-green-100 text-green-800 border-green-300",
    Reservado: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Desfavorable: "bg-red-100 text-red-800 border-red-300",
    Dudoso: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="border-b pb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Pronóstico Específico
        </h3>

        {readOnly ? (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 shadow-sm ${coloresPronostico[item.pronostico] || "bg-white"}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold">Diente {item.diente}</h4>
                  <span className="text-sm italic text-gray-500">{item.ubicacion}</span>
                </div>
                <div className="mb-1">
                  <strong className="text-gray-700">Tipo de Alteración:</strong> {item.tipo_alteracion}
                </div>
                <div className="mb-1">
                  <strong className="text-gray-700">Pronóstico:</strong> {item.pronostico}
                </div>
                <div className="text-xs text-gray-500 mt-2 flex flex-col sm:flex-row sm:justify-between">
                  <span>Registro: {new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>Actualización: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {data.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mb-4">
                {/* Select Diente */}
                <div>
                  <label className="block text-gray-700 mb-1">Diente</label>
                  <select
                    name="diente"
                    value={item.diente}
                    onChange={(e) => onChange(index, e.target)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {listaDientes.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Select Ubicación */}
                <div>
                  <label className="block text-gray-700 mb-1">Ubicación</label>
                  <select
                    name="ubicacion"
                    value={item.ubicacion}
                    onChange={(e) => onChange(index, e.target)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {listaUbicaciones.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Tipo de Alteración */}
                <div>
                  <label className="block text-gray-700 mb-1">Tipo de Alteración</label>
                  <select
                    name="tipo_alteracion"
                    value={item.tipo_alteracion}
                    onChange={(e) => onChange(index, e.target)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {opcionesAlteracion.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>

                {/* Pronóstico */}
                <div>
                  <label className="block text-gray-700 mb-1">Pronóstico</label>
                  <select
                    name="pronostico"
                    value={item.pronostico}
                    onChange={(e) => onChange(index, e.target)}
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">-- Selecciona --</option>
                    {opcionesPronostico.map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>

                {/* Botón Eliminar */}
                {data.length > 1 && (
                  <div className="col-span-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={onAdd}
              className="text-sm px-4 py-2 rounded bg-green-100 text-green-700 hover:bg-green-200"
            >
              + Agregar Pronóstico
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PronosticoEspecifico;
