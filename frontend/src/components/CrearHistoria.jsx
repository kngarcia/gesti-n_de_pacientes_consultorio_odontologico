import { useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const CrearHistoria = ({ onBack, onHistoriaCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    antecedentesOdontologicos: {
      bruxismo: 'No',
      onicofagia: 'No',
      mordedura_labio_inferior_superior: 'No',
      succion_digital: 'No',
      biberon: 'No',
      deglucion_atipica: 'No',
      respirador_bucal: 'No',
    },
    antecedentesPatologicos: {
      hiv: 'No',
      hepatitis: 'No',
      fiebre_reumatica: 'No',
      diabetes: 'No',
      ulcera_gastrica_o_hernia_hiatal: 'No',
      epilepsia: 'No',
      presion_arterial_alta: 'No',
      convulsiones: 'No',
      mareos_frecuentes: 'No',
      fracturas_accidentes: 'No',
      cicatriza_normalmente: 'No',
      infarto_miocardio: 'No',
      reemplazo_valvulas: 'No',
      perdida_conocimiento: 'No',
      perdida_peso: 'No',
      alergias: 'No',
      descripcion_alergias: '',
      otros: 'No',
      descripcion_otros: '',
    },
    antecedentesToxixologicos: {
      fuma: 'No',
      ingiere_alcohol: 'No',
      usa_drogas: 'No',
      alergico_anestesia_o_vasoconstrictores: 'No',
      toma_medicamentos_actualmente: 'No',
      alergico_algun_medicamento: 'No',
      otros: 'No',
      descripcion_otros: '',
    },
    antecedentesHospitalarios: {
      transfusiones: 'No',
      hospitalizado: 'No',
      razon_hospitalizacion: '',
      operado: 'No',
      descripcion_operacion: '',
    },
    antecedentesFamiliares: {
      afecciones_cardiacas: 'No',
      diabetes: 'No',
      hipertension: 'No',
      epilepsia: 'No',
      cancer: 'No',
      tuberculosis: 'No',
      otras: 'No',
      especificacion: '',
    },
    antecedentesGinecoobtetricos: {
      toma_anticonseptivos: 'No',
      embarazada: 'No',
      meses_embarazo: null,
      reemplazo_cadera_o_fractura_femur: 'No',
    },
    antecedentesEstomatologicos: {
      luxacion_o_fractura_mandibula: 'No',
      amigdalitis: 'No',
      infecciones_orales_a_repeticion: 'No',
      mal_aliento: 'No',
      fuegos: 'No',
    },
  });

  const handleInputChange = (section, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/historias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al crear la historia clínica');
      }

      onHistoriaCreated && onHistoriaCreated();
      onBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleSubmit} />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-screen">
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Crear Historia Clínica</h2>
      </div>
  
      <form className="space-y-6">
        {Object.entries(formData).map(([section, fields]) => (
          <div key={section} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              {section.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(fields).map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-500">{key.replace(/_/g, ' ')}</label>
                  {key.startsWith('descripcion') || key.includes('razon') || key.includes('especificacion') ? (
                    <textarea
                      value={fields[key]}
                      onChange={(e) => handleInputChange(section, key, e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`${section}-${key}`}
                          value="Si"
                          checked={fields[key] === "Si"}
                          onChange={() => handleInputChange(section, key, "Si")}
                          className="form-radio"
                        />
                        <span>Si</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`${section}-${key}`}
                          value="No"
                          checked={fields[key] === "No"}
                          onChange={() => handleInputChange(section, key, "No")}
                          className="form-radio"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
  
        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Crear Historia
          </button>
        </div>
      </form>
    </div>
  );
  
}  

export default CrearHistoria;