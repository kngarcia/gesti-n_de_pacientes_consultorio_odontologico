import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import diagnosticoGeneralService from './DiagnosticoGeneralService';
import Spinner from '../../Spinner';

const DiagnosticoGeneral = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [diagnosticoExistente, setDiagnosticoExistente] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialFormData = {
    descripcion_tejidos_blandos: '',
    descripcion_tejidos_duros: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await diagnosticoGeneralService.obtenerDiagnostico(patientId);
        if (response.data) {
          setFormData({
            descripcion_tejidos_blandos: response.data.descripcion_tejidos_blandos,
            descripcion_tejidos_duros: response.data.descripcion_tejidos_duros
          });
          setDiagnosticoExistente(true);
          setEditMode(false);
        } else {
          setEditMode(true);
          setDiagnosticoExistente(false);
        }
      } catch (error) {
        setError('Error cargando diagnóstico');
        setEditMode(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (patientId) loadData();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.descripcion_tejidos_blandos || !formData.descripcion_tejidos_duros) {
      setError('Ambos campos son requeridos');
      setLoading(false);
      return;
    }

    try {
      const response = diagnosticoExistente 
        ? await diagnosticoGeneralService.actualizarDiagnostico(patientId, formData)
        : await diagnosticoGeneralService.crearDiagnostico(patientId, formData);
      
      if ([200, 201].includes(response.status)) {
        setSuccess(diagnosticoExistente ? 'Diagnóstico actualizado' : 'Diagnóstico creado');
        setDiagnosticoExistente(true);
        setEditMode(false);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Diagnóstico General</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {diagnosticoExistente ? 'Editar Diagnóstico' : 'Crear Diagnóstico'}
            </button>
          )}
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

        {!editMode ? (
          diagnosticoExistente ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Tejidos Blandos</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.descripcion_tejidos_blandos}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Tejidos Duros</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.descripcion_tejidos_duros}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
              <p>No se ha registrado ningún diagnóstico general</p>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Descripción Tejidos Blandos
                </label>
                <textarea
                  name="descripcion_tejidos_blandos"
                  value={formData.descripcion_tejidos_blandos}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Descripción Tejidos Duros
                </label>
                <textarea
                  name="descripcion_tejidos_duros"
                  value={formData.descripcion_tejidos_duros}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {diagnosticoExistente ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DiagnosticoGeneral;