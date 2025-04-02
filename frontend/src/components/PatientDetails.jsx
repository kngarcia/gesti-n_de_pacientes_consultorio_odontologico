import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const PatientDetails = ({ patientId, onBack, onPatientUpdated, onPatientDeleted }) => {
  // Estados del componente
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    documento_identidad: '',
    edad: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    genero: '',
    estado_civil: '',
    eps: '',
    cotizante: '',
    beneficiario: '',
    origen_enfermedad: '',
    motivo_consulta: ''
  });

  // Obtener datos del paciente
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
          eps: data.eps,
          cotizante: data.cotizante || '',
          beneficiario: data.beneficiario || '',
          origen_enfermedad: data.origen_enfermedad,
          motivo_consulta: data.motivo_consulta || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      // Validaciones básicas en el frontend
      if (!formData.nombre_completo || !formData.documento_identidad || 
          !formData.edad || !formData.telefono || !formData.eps || 
          !formData.origen_enfermedad) {
        throw new Error('Por favor complete todos los campos obligatorios');
      }
  
      // Preparar los datos para enviar
      const datosParaEnviar = {
        nombre_completo: formData.nombre_completo,
        documento_identidad: formData.documento_identidad,
        edad: parseInt(formData.edad),
        telefono: formData.telefono,
        direccion: formData.direccion || null,
        fecha_nacimiento: formData.fecha_nacimiento || null,
        genero: formData.genero || null,
        estado_civil: formData.estado_civil || null,
        eps: formData.eps,
        cotizante: formData.cotizante || 'No',
        beneficiario: formData.beneficiario || 'No',
        origen_enfermedad: formData.origen_enfermedad,
        motivo_consulta: formData.motivo_consulta || null
      };
  
      const response = await fetch(`http://localhost:3000/api/pacientes/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosParaEnviar)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al actualizar paciente');
      }
      
      const updatedPatient = await response.json();
      setPatient(updatedPatient);
      setIsEditing(false);
      onPatientUpdated && onPatientUpdated();
    } catch (err) {
      setError(err.message);
      console.error('Error al guardar:', err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar paciente
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este paciente? Esta acción no se puede deshacer.')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/pacientes/${patientId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Error al eliminar paciente');
        
        onPatientDeleted && onPatientDeleted(); // Notificar al padre
        onBack(); // Volver a la lista
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!patient) return <div className="p-4 text-red-500">Paciente no encontrado</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Encabezado y botón de volver */}
      <div className="flex justify-between items-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Volver a la lista
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`CrearHistoria.jsx`)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Crear Historia
          </button>
          <button
            onClick={() => navigate(`VerHistoria.jsx`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Ver Historia
          </button>

          {!isEditing && (
            
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Editar
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Información principal del paciente */}
      <div className="mb-8">
        {isEditing ? (
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleInputChange}
            className="text-2xl font-bold text-gray-800 mb-2 p-2 border rounded w-full"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{patient.nombre_completo}</h2>
        )}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          {isEditing ? (
            <input
              type="text"
              name="documento_identidad"
              value={formData.documento_identidad}
              onChange={handleInputChange}
              className="p-1 border rounded"
            />
          ) : (
            <span>Cédula: {patient.documento_identidad}</span>
          )}
          {isEditing ? (
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleInputChange}
              className="p-1 border rounded w-16"
            />
          ) : (
            <span>Edad: {patient.edad} años</span>
          )}
          {isEditing ? (
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="p-1 border rounded"
            />
          ) : (
            <span>Teléfono: {patient.telefono}</span>
          )}
        </div>
      </div>

      {/* Secciones de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda - Datos personales */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Datos Personales</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                {isEditing ? (
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                  />
                ) : (
                  <p>{patient.fecha_nacimiento || 'No registrada'}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Género</p>
                {isEditing ? (
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                ) : (
                  <p>{patient.genero || 'No especificado'}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Estado Civil</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="estado_civil"
                    value={formData.estado_civil}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                  />
                ) : (
                  <p>{patient.estado_civil || 'No especificado'}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                {isEditing ? (
                  <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                    rows={3}
                  />
                ) : (
                  <p>{patient.direccion || 'No registrada'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Datos médicos y EPS */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Información de Salud</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">EPS</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="eps"
                    value={formData.eps}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                    required
                  />
                ) : (
                  <p>{patient.eps}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Tipo de Afiliación</p>
                {isEditing ? (
                    <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="tipo_afiliacion"  // Mismo nombre para ambos
                        value="cotizante"
                        checked={formData.cotizante === 'Si'}
                        onChange={() => setFormData({
                            ...formData,
                            cotizante: 'Si',
                            beneficiario: 'No'
                        })}
                        className="mr-2"
                        />
                        Cotizante
                    </label>
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="tipo_afiliacion"  // Mismo nombre para ambos
                        value="beneficiario"
                        checked={formData.beneficiario === 'Si'}
                        onChange={() => setFormData({
                            ...formData,
                            cotizante: 'No',
                            beneficiario: 'Si'
                        })}
                        className="mr-2"
                        />
                        Beneficiario
                    </label>
                    </div>
                ) : (
                    <p>
                    {patient.cotizante === 'Si' && 'Cotizante'}
                    {patient.beneficiario === 'Si' && 'Beneficiario'}
                    {patient.cotizante === 'No' && patient.beneficiario === 'No' && 'No especificado'}
                    </p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Origen de Enfermedad</p>
                {isEditing ? (
                  <select
                    name="origen_enfermedad"
                    value={formData.origen_enfermedad}
                    onChange={handleInputChange}
                    className="p-1 border rounded w-full"
                    required
                  >
                    <option value="Paciente sano">Paciente sano</option>
                    <option value="Enfermedad general o común">Enfermedad general/común</option>
                    <option value="Enfermedad profesional o ocupacional">Enfermedad profesional/ocupacional</option>
                    <option value="Accidente de trabajo">Accidente de trabajo</option>
                    <option value="Accidente no de trabajo o fuera del trabajo">Accidente no laboral</option>
                  </select>
                ) : (
                  <p>
                    {patient.origen_enfermedad === 'Paciente sano' && 'Paciente sano'}
                    {patient.origen_enfermedad === 'Enfermedad general o común' && 'Enfermedad general/común'}
                    {patient.origen_enfermedad === 'Enfermedad profesional o ocupacional' && 'Enfermedad profesional/ocupacional'}
                    {patient.origen_enfermedad === 'Accidente de trabajo' && 'Accidente de trabajo'}
                    {patient.origen_enfermedad === 'Accidente no de trabajo o fuera del trabajo' && 'Accidente no laboral'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Motivo de Consulta</h3>
            {isEditing ? (
              <textarea
                name="motivo_consulta"
                value={formData.motivo_consulta}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            ) : (
              <p className="whitespace-pre-line">
                {patient.motivo_consulta || 'No registrado'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botones de guardar/cancelar en modo edición */}
      {isEditing && (
        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;