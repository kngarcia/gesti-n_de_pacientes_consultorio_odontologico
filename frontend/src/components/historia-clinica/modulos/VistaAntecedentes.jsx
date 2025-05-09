import { SECTION_LABELS, FIELD_LABELS } from './antecedentesConstants';

const VistaAntecedentes = ({ datos, onEdit, onBack }) => {
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'No registrado';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (value === 'Si' || value === 'No') return value;
    return value.toString();
  };

  // Filtrar campos principales que no son secciones
  const camposPrincipales = Object.entries(datos).filter(
    ([key]) => !key.startsWith('id_') && !SECTION_LABELS[key]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Antecedentes Médicos
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
          Editar Antecedentes
        </button>
      </div>

      {/* Campos principales */}
      {camposPrincipales.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {camposPrincipales.map(([field, value]) => (
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
      )}

      {/* Secciones de antecedentes */}
      {Object.entries(datos)
        .filter(([key]) => SECTION_LABELS[key])
        .map(([section, fields]) => (
          <div key={section} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              {SECTION_LABELS[section]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(fields)
                .filter(([field]) => !field.startsWith('id')) // Filtramos campos internos
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
        ))}
    </div>
  );
};

export default VistaAntecedentes;