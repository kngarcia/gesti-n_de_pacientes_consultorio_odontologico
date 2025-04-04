import { useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from "react-router-dom";
import FrecuenciaCepillado from './FrecuenciaCepillado';

// Diccionario de etiquetas para las secciones
const sectionLabels = {
  antecedentesOdontologicos: "ANTECEDENTES ODONTOLÓGICOS",
  antecedentesPatologicos: "ANTECEDENTES PATOLÓGICOS",
  antecedentesToxicologicos: "ANTECEDENTES TOXICOLÓGICOS", // Nota: Si prefieres cambiar la clave en el estado, recuerda ajustar también el backend.
  antecedentesHospitalarios: "ANTECEDENTES HOSPITALARIOS",
  antecedentesFamiliares: "ANTECEDENTES  FAMILIARES",
  antecedentesGinecoobtetricos: "ANTECEDENTES  GINECOOBTETRICOS", // Nota: "Ginecoobtetricos" a "Ginecoobstétricos"
  antecedentesEstomatologicos: "ANTECEDENTES  ESTOMATOLÓGICOS",
};

// Diccionario de etiquetas para cada campo
const fieldLabels = {
  // Antecedentes Odontológicos
  bruxismo: "Bruxismo",
  onicofagia: "Onicofagia",
  mordedura_labio_inferior_superior: "Mordedura de labio inferior/superior",
  succion_digital: "Succión digital",
  biberon: "Biberón",
  deglucion_atipica: "Deglución atípica",
  respirador_bucal: "Respirador bucal",

  // Antecedentes Patológicos
  hiv: "VIH",
  hepatitis: "Hepatitis",
  fiebre_reumatica: "Fiebre reumática",
  diabetes: "Diabetes",
  ulcera_gastrica_o_hernia_hiatal: "Úlcera gástrica o hernia hiatal",
  epilepsia: "Epilepsia",
  presion_arterial_alta: "Presión arterial alta",
  convulsiones: "Convulsiones",
  mareos_frecuentes: "Mareos frecuentes",
  fracturas_accidentes: "Fracturas o accidentes",
  cicatriza_normalmente: "Cicatriza normalmente",
  infarto_miocardio: "Infarto al miocardio",
  reemplazo_valvulas: "Reemplazo de válvulas",
  perdida_conocimiento: "Pérdida de conocimiento",
  perdida_peso: "Pérdida de peso",
  alergias: "Alergias",
  descripcion_alergias: "Descripción de alergias",
  otros: "Otros",
  descripcion_otros: "Descripción de otros",

  // Antecedentes Toxicológicos
  fuma: "Fuma",
  ingiere_alcohol: "Ingiere alcohol",
  usa_drogas: "Usa drogas",
  alergico_anestesia_o_vasoconstrictores: "Alérgico(a) a anestesia o vasoconstrictores",
  toma_medicamentos_actualmente: "Toma medicamentos actualmente",
  alergico_algun_medicamento: "Alérgico(a) a algún medicamento",
  // Nota: Se reutiliza "otros" y "descripcion_otros". Si se requiere diferenciarlos, se deben renombrar en el estado.

  // Antecedentes Hospitalarios
  transfusiones: "Transfusiones",
  hospitalizado: "Hospitalizado(a)",
  razon_hospitalizacion: "Razón de hospitalización",
  operado: "Operado(a)",
  descripcion_operacion: "Descripción de operación",

  // Antecedentes Familiares
  afecciones_cardiacas: "Afecciones cardíacas",
  hipertension: "Hipertensión",
  cancer: "Cáncer",
  tuberculosis: "Tuberculosis",
  especificacion: "Especificación",

  // Antecedentes Ginecoobstétricos
  toma_anticonseptivos: "Toma anticonceptivos",
  embarazada: "Embarazada",
  meses_embarazo: "Meses de embarazo",
  reemplazo_cadera_o_fractura_femur: "Reemplazo de cadera o fractura de fémur",

  // Antecedentes Estomatológicos
  luxacion_o_fractura_mandibula: "Luxación o fractura de mandíbula",
  amigdalitis: "Amigdalitis",
  infecciones_orales_a_repeticion: "Infecciones orales a repetición",
  mal_aliento: "Mal aliento",
  fuegos: "Fuegos (aftas o herpes)",
};

const AntecedentesHistoria = ({ onBack, onHistoriaCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mostrarFrecuenciaCepillado, setMostrarFrecuenciaCepillado] = useState(false);
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
      otros: 'No',
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

  const handleSiguiente = () => {
    navigate("/FrecuenciaCepillado");
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
  if (mostrarFrecuenciaCepillado) {
    return <FrecuenciaCepillado onBack={() => setMostrarFrecuenciaCepillado(false)} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-screen">
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Antecedentes de la Historia Clínica
        </h2>
      </div>
  
      <form className="space-y-6">
        {Object.entries(formData).map(([section, fields]) => (
          <div key={section} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              {sectionLabels[section] || section}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(fields).map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-500">
                    {fieldLabels[key] || key.replace(/_/g, ' ')}
                  </label>
                  {key.startsWith('descripcion') ||
                   key.includes('razon') ||
                   key.includes('especificacion') ? (
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
            Atrás
          </button>
          <button
            type="button"
            onClick={() => setMostrarFrecuenciaCepillado(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default AntecedentesHistoria;
