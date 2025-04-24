import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner';
import ErrorMessage from '../../ErrorMessage';
import ConfirmModal from '../../ConfirmModal';
import FormularioAntecedentes from './FormularioAntecedentes';
import VistaAntecedentes from './VistaAntecedentes';
import { INITIAL_FORM_DATA } from './antecedentesConstants';
import antecedentesService from './antecedentesService';

const Antecedentes = ({ onBack }) => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [antecedentes, setAntecedentes] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [notFound, setNotFound] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const cargarAntecedentes = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        
        const data = await antecedentesService.getAntecedentesByPacienteId(patientId);
        
        if (data === null) {
          setNotFound(true);
          setFormData(INITIAL_FORM_DATA);
          return;
        }

        setAntecedentes(data);
        setFormData({
          antecedentesFamiliares: data.antecedentesFamiliares || INITIAL_FORM_DATA.antecedentesFamiliares,
          antecedentesPatologicos: data.antecedentesPatologicos || INITIAL_FORM_DATA.antecedentesPatologicos,
          antecedentesToxixologicos: data.antecedentesToxixologicos || INITIAL_FORM_DATA.antecedentesToxixologicos,
          antecedentesGinecoobtetricos: data.antecedentesGinecoobtetricos || INITIAL_FORM_DATA.antecedentesGinecoobtetricos,
          antecedentesEstomatologicos: data.antecedentesEstomatologicos || INITIAL_FORM_DATA.antecedentesEstomatologicos,
          antecedentesHospitalarios: data.antecedentesHospitalarios || INITIAL_FORM_DATA.antecedentesHospitalarios,
          antecedentesOdontologicos: data.antecedentesOdontologicos || INITIAL_FORM_DATA.antecedentesOdontologicos
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarAntecedentes();
  }, [patientId]);

  const handleCrearAntecedentes = async () => {
    try {
      setLoading(true);
      const resultado = await antecedentesService.saveAntecedentes(patientId, formData);
      setAntecedentes(resultado);
      setNotFound(false);
      setShowCreateModal(false);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarCambios = async (datosActualizados) => {
    try {
      setLoading(true);
      const resultado = await antecedentesService.saveAntecedentes(patientId, datosActualizados);
      setAntecedentes(resultado);
      setFormData(datosActualizados);
      setNotFound(false);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {notFound || !antecedentes ? (
        <div className="text-center py-8">
          <p className="mb-4">No se han registrado antecedentes para este paciente</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear Antecedentes
          </button>
        </div>
      ) : editMode ? (
        <FormularioAntecedentes
          datosIniciales={formData}
          onSave={handleGuardarCambios}
          onBack={() => setEditMode(false)}
        />
      ) : (
        <VistaAntecedentes
          datos={formData}
          onEdit={() => setEditMode(true)}
          onBack={onBack}
        />
      )}

      <ConfirmModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCrearAntecedentes}
        title="Confirmar Creación"
        message="¿Está seguro que desea crear nuevos antecedentes para este paciente?"
      />
    </div>
  );
};

export default Antecedentes;