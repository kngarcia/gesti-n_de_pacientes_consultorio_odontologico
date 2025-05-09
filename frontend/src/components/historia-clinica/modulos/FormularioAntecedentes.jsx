import { useState } from 'react';
import Spinner from '../../Spinner';
import ErrorMessage from '../../ErrorMessage';
import { SECTION_LABELS, FIELD_LABELS, INITIAL_FORM_DATA } from './antecedentesConstants';

const FormularioAntecedentes = ({ datosIniciales = INITIAL_FORM_DATA, onSave, onBack }) => {
  const [formData, setFormData] = useState(datosIniciales);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para filtrar campos que no son editables
  const filterFields = (fields) => {
    return Object.entries(fields).filter(([fieldName]) => 
      !fieldName.startsWith('id') && 
      !['id_antecedente', 'id_historia'].includes(fieldName)
  )}

  const handleInputChange = (section, field, value) => {
    const newData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    };

    // Función helper para limpiar campos dependientes
    const clearFieldIfNo = (section, conditionField, targetField) => {
      if (newData[section][conditionField] === 'No') {
        newData[section][targetField] = '';
      }
    };

    // Lógica para cada sección
    switch(section) {
      case 'antecedentesFamiliares':
        if (field === 'otros_antecedentes_familiares') {
          clearFieldIfNo(section, 'otros_antecedentes_familiares', 'especificacion');
        }
        break;
        
      case 'antecedentesPatologicos':
        if (field === 'alergias') {
          clearFieldIfNo(section, 'alergias', 'descripcion_alergias');
        }
        if (field === 'otros') {
          clearFieldIfNo(section, 'otros', 'descripcion_otros');
        }
        break;

      case 'antecedentesToxixologicos':
        if (field === 'otros_antecedentes_toxicologicos') {
          clearFieldIfNo(section, 'otros_antecedentes_toxicologicos', 'descripcion_otros_antecedentes_toxicologicos');
        }
        break;

      case 'antecedentesHospitalarios':
        if (field === 'hospitalizado') {
          clearFieldIfNo(section, 'hospitalizado', 'razon_hospitalizacion');
        }
        if (field === 'operado') {
          clearFieldIfNo(section, 'operado', 'descripcion_operacion');
        }
        break;

      case 'antecedentesGinecoobtetricos':
        if (field === 'embarazada' && value === 'No') {
          newData.antecedentesGinecoobtetricos.meses_embarazo = null;
        }
        break;
    }

    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await onSave(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (section, field, value) => {
    const isDisabled = () => {
      switch(section) {
        case 'antecedentesFamiliares':
          return field === 'especificacion' && 
                 formData.antecedentesFamiliares?.otros_antecedentes_familiares === 'No';
          
        case 'antecedentesPatologicos':
          if (field === 'descripcion_alergias') {
            return formData.antecedentesPatologicos?.alergias === 'No';
          }
          if (field === 'descripcion_otros') {
            return formData.antecedentesPatologicos?.otros === 'No';
          }
          return false;
          
        case 'antecedentesToxixologicos':
          return field === 'descripcion_otros_antecedentes_toxicologicos' && 
                 formData.antecedentesToxixologicos?.otros_antecedentes_toxicologicos === 'No';
          
        case 'antecedentesHospitalarios':
          if (field === 'razon_hospitalizacion') {
            return formData.antecedentesHospitalarios?.hospitalizado === 'No';
          }
          if (field === 'descripcion_operacion') {
            return formData.antecedentesHospitalarios?.operado === 'No';
          }
          return false;
          
        case 'antecedentesGinecoobtetricos':
          return field === 'meses_embarazo' && 
                 formData.antecedentesGinecoobtetricos?.embarazada === 'No';
          
        default:
          return false;
      }
    };

    if (field.startsWith('descripcion') || field.includes('razon') || field.includes('especificacion')) {
      return (
        <textarea
          value={value || ''}
          onChange={(e) => handleInputChange(section, field, e.target.value)}
          className={`w-full p-2 border rounded text-sm ${isDisabled() ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          rows={3}
          placeholder={`Describa ${FIELD_LABELS[field]?.toLowerCase() || field.toLowerCase()}`}
          disabled={isDisabled()}
        />
      );
    }

    if (field === 'meses_embarazo') {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max="12"
            value={value || ''}
            onChange={(e) => handleInputChange(section, field, e.target.value)}
            className={`p-2 border rounded w-20 ${isDisabled() ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            disabled={isDisabled()}
          />
          <span className="text-sm text-gray-500">meses</span>
        </div>
      );
    }

    if (typeof value === 'string' && (value === 'Si' || value === 'No')) {
      return (
        <div className="flex space-x-4">
          {['Si', 'No'].map((opcion) => (
            <label key={opcion} className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name={`${section}-${field}`}
                value={opcion}
                checked={value === opcion}
                onChange={() => handleInputChange(section, field, opcion)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span>{opcion}</span>
            </label>
          ))}
        </div>
      );
    }

    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => handleInputChange(section, field, e.target.value)}
        className="w-full p-2 border rounded"
      />
    );
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleSubmit} />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Volver</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Formulario Completo de Antecedentes Médicos
        </h2>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {Object.entries(formData).map(([section, fields]) => (
          <div key={section} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              {SECTION_LABELS[section]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterFields(fields).map(([field, value]) => (
                <div key={`${section}-${field}`} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {FIELD_LABELS[field]}
                  </label>
                  {renderField(section, field, value)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
            </svg>
            <span>{datosIniciales?.id_antecedente ? 'Actualizar' : 'Guardar'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};


export default FormularioAntecedentes;