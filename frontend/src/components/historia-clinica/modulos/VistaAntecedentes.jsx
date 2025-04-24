import { SECTION_LABELS, FIELD_LABELS } from './antecedentesConstants';

const VistaAntecedentes = ({ datos, onEdit, onBack }) => {
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'No registrado';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';
    if (value === 'Si' || value === 'No') return value;
    return value.toString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Antecedentes Médicos
        </h2>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Editar
        </button>
      </div>

      {Object.entries(datos).map(([section, fields]) => (
        <div key={section} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            {SECTION_LABELS[section]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(fields).map(([field, value]) => (
              <div key={`${section}-${field}`} className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  {FIELD_LABELS[field]}
                </label>
                <div className="text-gray-800 p-2 bg-white rounded border border-transparent">
                  {formatValue(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VistaAntecedentes;