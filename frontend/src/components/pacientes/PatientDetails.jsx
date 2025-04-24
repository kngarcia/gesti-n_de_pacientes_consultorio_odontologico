import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import PatientHeader from './PatientHeader';
import PatientBasicInfo from './PatientBasicInfo';
import PersonalDataSection from './PersonalDataSection';
import HealthInfoSection from './HealthInfoSection';
import ConsultReasonSection from './ConsultReasonSection';
import FormActions from './FormActions';

const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    documento_identidad: '',
    edad: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    genero: '',
    estado_civil: '',
    nombre_acompanante: '',
    telefono_acompanante: '',
    nombre_responsable: '',
    parentesco_responsable: '',
    telefono_responsable: '',
    eps: '',
    cotizante: '',
    beneficiario: '',
    origen_enfermedad: '',
    motivo_consulta: ''
  });

  const fetchHistoryStatus = async (documento) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:3000/api/historia-clinica/documento/${documento}`, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
  
      if (res.ok) {
        const historyData = await res.json();
        setHasHistory(!!historyData); // si existe, lo marca como true
      } else if (res.status === 404) {
        setHasHistory(false); // No es un error, solo no existe
      } else {
        throw new Error('Error al verificar historia clínica');
      }
    } catch (err) {
      console.error('Error en fetchHistoryStatus:', err);
      setHasHistory(false); // Por defecto, asumir que no hay historia
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/pacientes/${patientId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Error al obtener paciente');
        
        const data = await response.json();
        setPatient(data);
        setFormData({
          nombre_completo: data.nombre_completo,
          documento_identidad: data.documento_identidad,
          edad: data.edad,
          telefono: data.telefono,
          direccion: data.direccion || '',
          fecha_nacimiento: data.fecha_nacimiento || '',
          genero: data.genero || '',
          estado_civil: data.estado_civil || '',
          nombre_acompanante: data.nombre_acompanante || '',
          telefono_acompanante: data.telefono_acompanante || '',
          nombre_responsable: data.nombre_responsable || '',
          parentesco_responsable: data.parentesco_responsable || '',
          telefono_responsable: data.telefono_responsable || '',
          eps: data.eps,
          cotizante: data.cotizante || '',
          beneficiario: data.beneficiario || '',
          origen_enfermedad: data.origen_enfermedad,
          motivo_consulta: data.motivo_consulta || ''
        });

        await fetchHistoryStatus(data.documento_identidad);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      if (!formData.nombre_completo || !formData.documento_identidad || 
          !formData.edad || !formData.telefono || !formData.eps || 
          !formData.origen_enfermedad) {
        throw new Error('Complete los campos obligatorios');
      }
  
      const response = await fetch(`http://localhost:3000/api/pacientes/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre_completo: formData.nombre_completo,
          documento_identidad: formData.documento_identidad,
          edad: parseInt(formData.edad),
          telefono: formData.telefono,
          direccion: formData.direccion || null,
          fecha_nacimiento: formData.fecha_nacimiento || null,
          genero: formData.genero || null,
          estado_civil: formData.estado_civil || null,
          nombre_acompanante: formData.nombre_acompanante || null,
          telefono_acompanante: formData.telefono_acompanante || null,
          nombre_responsable: formData.nombre_responsable || null,
          parentesco_responsable: formData.parentesco_responsable || null,
          telefono_responsable: formData.telefono_responsable || null,
          eps: formData.eps,
          cotizante: formData.cotizante || 'No',
          beneficiario: formData.beneficiario || 'No',
          origen_enfermedad: formData.origen_enfermedad,
          motivo_consulta: formData.motivo_consulta || null
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al actualizar');
      }
      
      const updatedPatient = await response.json();
      setPatient(updatedPatient);
      setIsEditing(false);
      navigate('/dashboard', { state: { patientUpdated: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/pacientes/${patientId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Error al eliminar');
        
        navigate('/dashboard', { state: { patientDeleted: true } });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleHistoryClick = async () => {
    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);
  
      if (!hasHistory) {
        const response = await fetch(
          `http://localhost:3000/api/historia-clinica/documento/${patient.documento_identidad}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              observaciones_generales: 'Historia clínica inicial'
            })
          }
        );
  
        if (!response.ok) throw new Error('Error al crear historia clínica');
        setHasHistory(true);
      }
  
      navigate(`/pacientes/${patientId}/historia-clinica`);
  
    } catch (error) {
      setError('No se pudo acceder a la historia clínica');
      console.error('Error en handleHistoryClick:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!patient) return <div className="p-4 text-red-500">Paciente no encontrado</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <PatientHeader
        onBack={handleBack}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
        isEditing={isEditing}
        hasHistory={hasHistory}
        onHistoryClick={handleHistoryClick}
      />

      <PatientBasicInfo
        patient={patient}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <PersonalDataSection
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="space-y-6">
          <HealthInfoSection
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />
          <ConsultReasonSection
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>

      <FormActions
        isEditing={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
};

export default PatientDetails;