import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pronosticoService from './PronosticoService';
import Spinner from '../../Spinner';
import AlteracionesPulpares from './AlteracionesPulpares';
import AlteracionesPeriodontales from './AlteracionesPeriodontales';
import PronosticoEspecifico from './PronosticoEspecifico';

// Lista de dientes (FDI)
const listaDientesFDI = [
  '11','12','13','14','15','16','17','18',
  '21','22','23','24','25','26','27','28',
  '31','32','33','34','35','36','37','38',
  '41','42','43','44','45','46','47','48'
];

// Lista de ubicaciones posibles
const listaUbicaciones = [
  'Superior Derecho',
  'Superior Izquierdo',
  'Inferior Derecho',
  'Inferior Izquierdo'
];

const PronosticoGeneral = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [existeRegistro, setExisteRegistro] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialData = {
    alteracionesPulpares: {
      cambio_color: '',
      fistula: '',
      sintomatico: 'No',
      asintomatico: 'No',
      observaciones: ''
    },
    alteracionesPeriodontales: {
      movilidad: 'No',
      placa_blanda: 'No',
      placa_calcificada: 'No',
      sangrado: 'No',
      retraccion_gingival: 'No',
      observaciones: ''
    },
    pronosticosEspecificos: []
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await pronosticoService.obtenerTodo(patientId);
        const data = res.data !== undefined ? res.data : res;
        console.log('Normalized data:', data);

        setFormData({
          alteracionesPulpares:      data.pulpares      || initialData.alteracionesPulpares,
          alteracionesPeriodontales: data.periodontales || initialData.alteracionesPeriodontales,
          pronosticosEspecificos:    data.pronosticos   || initialData.pronosticosEspecificos
        });

        setExisteRegistro(
          Boolean(
            data.pulpares ||
            data.periodontales ||
            (data.pronosticos && data.pronosticos.length > 0)
          )
        );
        setEditMode(false);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error cargando datos');
        setEditMode(true);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) cargarDatos();
  }, [patientId]);

  const handleChange = (seccion, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor
      }
    }));
  };

  const handlePronosticoChange = (index, { name, value }) => {
    const nuevos = [...formData.pronosticosEspecificos];
    nuevos[index] = { ...nuevos[index], [name]: value };
    setFormData(prev => ({ ...prev, pronosticosEspecificos: nuevos }));
  };

  const agregarPronostico = () => {
    setFormData(prev => ({
      ...prev,
      pronosticosEspecificos: [
        ...prev.pronosticosEspecificos,
        { diente: '', ubicacion: '', tipo_alteracion: '', pronostico: '' }
      ]
    }));
  };

  const removerPronostico = index => {
    setFormData(prev => ({
      ...prev,
      pronosticosEspecificos: prev.pronosticosEspecificos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        pulpares: formData.alteracionesPulpares,
        periodontales: formData.alteracionesPeriodontales,
        pronosticos: formData.pronosticosEspecificos
      };
      const fn = existeRegistro ? 'actualizar' : 'crear';
      const response = await pronosticoService[fn](patientId, payload);
      if ([200, 201].includes(response.status)) {
        setSuccess(existeRegistro ? 'Datos actualizados' : 'Datos guardados');
        setExisteRegistro(true);
        setEditMode(false);
      }
    } catch (err) {
      console.error('Error guardando datos:', err);
      setError(err.response?.data?.message || 'Error guardando datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pronóstico y Alteraciones</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              {existeRegistro ? 'Editar Pronóstico' : 'Crear Registro'}
            </button>
          )}
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

        {!editMode ? (
          existeRegistro ? (
            <div className="space-y-6">
              <AlteracionesPulpares data={formData.alteracionesPulpares} readOnly />
              <AlteracionesPeriodontales data={formData.alteracionesPeriodontales} readOnly />
              <PronosticoEspecifico
                data={formData.pronosticosEspecificos}
                listaDientes={listaDientesFDI}
                listaUbicaciones={listaUbicaciones}
                readOnly
              />
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">No se han registrado datos</div>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <AlteracionesPulpares
              data={formData.alteracionesPulpares}
              onChange={(campo, valor) => handleChange('alteracionesPulpares', campo, valor)}
            />
            <AlteracionesPeriodontales
              data={formData.alteracionesPeriodontales}
              onChange={(campo, valor) => handleChange('alteracionesPeriodontales', campo, valor)}
            />
            <PronosticoEspecifico
              data={formData.pronosticosEspecificos}
              onAdd={agregarPronostico}
              onChange={handlePronosticoChange}
              onRemove={removerPronostico}
              listaDientes={listaDientesFDI}
              listaUbicaciones={listaUbicaciones}
            />
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setEditMode(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                Cancelar
              </button>
              <button type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                </svg>

                {existeRegistro ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PronosticoGeneral;
