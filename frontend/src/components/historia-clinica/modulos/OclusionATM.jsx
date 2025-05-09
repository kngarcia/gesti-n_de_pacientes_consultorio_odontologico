import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner';
import PlanoFrontal from './PlanoFrontal';
import PlanoHorizontal from './PlanoHorizontal';
import AnomaliasATM from './AnomaliasATM';
import { oclusionService } from './oclusionService';

const OclusionATM = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [existeRegistro, setExisteRegistro] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Configuración de campos permitidos por sección
  const camposPermitidos = {
    PlanoFrontal: ['mordedura_abierta', 'mordedura_profunda', 'sobremordida_vertical', 'sobre_mordida_horizontal'],
    PlanoHorizontal: ['mordida_cruzada_anterior', 'mordida_cruzada_exterior', 'mordida_borde_a_borde'],
    AnomaliasATM: ['ruido_articular', 'difusion_dolorosa', 'limitacion_apertura']
  };

  const initialData = {
    observaciones: '',
    PlanoFrontal: {
      mordedura_abierta: 'No',
      mordedura_profunda: 'No',
      sobremordida_vertical: 'No',
      sobre_mordida_horizontal: 'No'
    },
    PlanoHorizontal: {
      mordida_cruzada_anterior: 'No',
      mordida_cruzada_exterior: 'No',
      mordida_borde_a_borde: 'No'
    },
    AnomaliasATM: {
      ruido_articular: 'No',
      difusion_dolorosa: 'No',
      limitacion_apertura: 'No'
    }
  };

  const [formData, setFormData] = useState(initialData);

  // Función para filtrar campos no permitidos
  const filtrarCampos = (data, seccion) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (camposPermitidos[seccion].includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  const deepMergeData = (initial, apiData) => {
    if (!apiData) return initial;
    
    return {
      observaciones: apiData.observaciones || initial.observaciones,
      PlanoFrontal: {
        ...initial.PlanoFrontal,
        ...filtrarCampos(apiData.PlanoFrontals || {}, 'PlanoFrontal')
      },
      PlanoHorizontal: {
        ...initial.PlanoHorizontal,
        ...filtrarCampos(apiData.PlanoHorizontals || {}, 'PlanoHorizontal')
      },
      AnomaliasATM: {
        ...initial.AnomaliasATM,
        ...filtrarCampos(apiData.AnomaliasATMs || {}, 'AnomaliasATM')
      }
    };
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await oclusionService.obtenerOclusion(patientId);
        if (response.data) {
          const mergedData = deepMergeData(initialData, response.data);
          setFormData(mergedData);
          setExisteRegistro(true);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) loadData();
  }, [patientId]);

  const handleSubseccionChange = (subseccion, data) => {
    setFormData(prev => ({
      ...prev,
      [subseccion]: {
        ...prev[subseccion],
        ...data
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = existeRegistro 
        ? await oclusionService.actualizarOclusion(patientId, formData)
        : await oclusionService.crearOclusion(patientId, formData);

      if ([200, 201].includes(response.status)) {
        const mergedData = deepMergeData(initialData, response.data);
        setFormData(mergedData);
        setExisteRegistro(true);
        setEditMode(false);
        setSuccess(existeRegistro ? '¡Análisis actualizado!' : '¡Análisis creado!');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al guardar los cambios');
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    oclusionService.obtenerOclusion(patientId)
      .then(response => {
        if (response.data) {
          setFormData(deepMergeData(initialData, response.data));
        }
      });
  };

  const renderCampo = (label, value) => (
    <div className="flex justify-between items-center py-2 px-4 even:bg-gray-50">
      <span className="text-gray-600 capitalize">{label.replace(/_/g, ' ')}</span>
      <span className={`font-medium ${value === 'Si' ? 'text-red-600' : 'text-gray-800'}`}>
        {value || 'No'}
      </span>
    </div>
  );

  const renderSeccion = (titulo, datos, seccion) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">{titulo}</h3>
      <div className="grid grid-cols-1 gap-1">
        {camposPermitidos[seccion].map((campo) => (
          renderCampo(campo, datos[campo])
        ))}
      </div>
    </div>
  );

  const renderBotonAccion = () => (
    <button
      onClick={() => setEditMode(true)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
      </svg>  
       {existeRegistro ? 'Editar Análisis' : 'Crear Análisis'}
    </button>
  );

  if (loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Análisis de Oclusión ATM</h2>
          {!editMode && renderBotonAccion()}
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

        {!editMode && !existeRegistro && (
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
            No se encontró un análisis registrado
          </div>
        )}

        {!editMode && existeRegistro && (
          <div className="space-y-6">

            {renderSeccion('Plano Frontal', formData.PlanoFrontal, 'PlanoFrontal')}
            {renderSeccion('Plano Horizontal', formData.PlanoHorizontal, 'PlanoHorizontal')}
            {renderSeccion('Anomalías ATM', formData.AnomaliasATM, 'AnomaliasATM')}

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Observaciones Generales</h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {formData.observaciones || 'Ninguna'}
              </p>
            </div>
          </div>
        )}

        {editMode && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-8">
              
              <PlanoFrontal 
                data={formData.PlanoFrontal} 
                onChange={(data) => handleSubseccionChange('PlanoFrontal', data)}
              />
              
              <PlanoHorizontal
                data={formData.PlanoHorizontal}
                onChange={(data) => handleSubseccionChange('PlanoHorizontal', data)}
              />

              <AnomaliasATM
                data={formData.AnomaliasATM}
                onChange={(data) => handleSubseccionChange('AnomaliasATM', data)}
              />

              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Observaciones Generales</h3>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    observaciones: e.target.value
                  }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Ingrese observaciones relevantes..."
                />
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                  </svg>
                  {existeRegistro ? 'Actualizar' : 'Guardar'}
                  {loading && <Spinner size="small" />}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OclusionATM;