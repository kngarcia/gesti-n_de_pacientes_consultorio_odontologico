import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { examenEstomatologicoService } from './ExamenEstomatologicoService';
import Spinner from '../../Spinner';
import SeccionLabios from './SeccionLabios';
import SeccionLengua from './SeccionLengua';
import SeccionPisoDeBoca from './SeccionPisoDeBoca';
import SeccionMejillas from './SeccionMejillas';
import SeccionPaladar from './SeccionPaladar';
import SeccionMaxilares from './SeccionMaxilares';
import RadioGroup from './RadioGroup';

const ExamenEstomatologico = () => {
  const { patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [examenExistente, setExamenExistente] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialFormData = {
    musculos_masticadores: "No",
    sintomatico: "No",
    asintomatico: "No",
    labios: {
      herpes_labios: "No",
      quelitis_angular: "No",
      mucocele_labios: "No",
      frenillo_hipertrofico: "No",
      leocoplasia: "No",
      otro_labios: ""
    },
    lengua: {
      macroglosia: "No",
      microglosia: "No",
      geografica: "No",
      fisurada: "No",
      saburral: "No",
      otro_lengua: ""
    },
    pisoDeBoca: {
      mucocele_piso_boca: "No",
      ranula: "No",
      leucoplasia: "No",
      aftas_piso_boca: "No",
      otro_piso_boca: ""
    },
    mejillas: {
      aftas_mejillas: "No",
      herpes_mejillas: "No",
      liquen_plano: "No",
      otro_mejillas: ""
    },
    paladar: {
      ojival: "No",
      fisurado: "No",
      torus_platino: "No",
      palatitis_protesica: "No",
      otro_paladar: ""
    },
    maxilares: {
      macrognasia: "No",
      micrognasia: "No",
      torus_mandibular: "No",
      otro_maxilares: ""
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const deepMergeData = (initial, apiData) => {
    console.log("--- INICIO MERGE ---");
    console.log("Datos iniciales:", initial);
    console.log("Datos de API:", apiData);
  
    const merged = { ...initial };
    const secciones = ['labios', 'lengua', 'pisoDeBoca', 'mejillas', 'paladar', 'maxilares'];
  
    secciones.forEach(seccion => {
      console.log(`\nProcesando sección: ${seccion}`);
      
      // 1. Verificar existencia en API
      const apiSeccion = apiData[seccion];
      console.log(`Datos API para ${seccion}:`, apiSeccion);
  
      merged[seccion] = { ...initial[seccion] };
      
      if (apiSeccion) {
        console.log(`Mergeando campos para ${seccion}`);
        
        Object.keys(initial[seccion]).forEach(key => {
          const apiValor = apiSeccion[key];
          console.log(`- Campo: ${key}`);
          console.log(`  Valor inicial: ${initial[seccion][key]} | Valor API:`, apiValor);
  
          if (apiValor !== undefined) {
            const valorFinal = typeof apiValor === 'object' 
              ? apiValor.descripcion || ''
              : apiValor;
            
            merged[seccion][key] = valorFinal;
            console.log(`  Valor final:`, valorFinal);
          } else {
            console.log(`  Sin datos en API, manteniendo valor inicial`);
          }
        });
      } else {
        console.log(`No hay datos en API para ${seccion}`);
      }
    });
  
    // Campos de primer nivel
    const camposPrimerNivel = ['musculos_masticadores', 'sintomatico', 'asintomatico'];
    camposPrimerNivel.forEach(campo => {
      merged[campo] = apiData[campo] || initial[campo];
      console.log(`Campo primer nivel ${campo}:`, merged[campo]);
    });
  
    console.log("--- RESULTADO FINAL MERGE ---", merged);
    return merged;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await examenEstomatologicoService.obtenerEstomatologico(patientId);
        if (response.data) {
          const mergedData = deepMergeData(initialFormData, response.data);
          setFormData(mergedData);
          setExamenExistente(true);
          setEditMode(false);
        } else {
          setEditMode(true);
          setExamenExistente(false);
        }
      } catch (error) {
        setEditMode(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (patientId) loadData();
  }, [patientId]);

  const handleSectionChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const handleGeneralChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = examenExistente 
        ? await examenEstomatologicoService.actualizarEstomatologico(patientId, formData)
        : await examenEstomatologicoService.crearEstomatologico(patientId, formData);
        
      if (response.status === 200 || response.status === 201) {
        setSuccess(examenExistente ? 'Examen actualizado correctamente' : 'Examen creado correctamente');
        setExamenExistente(true);
        setEditMode(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al guardar el examen');
      console.error('Error al guardar el examen:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCampo = (label, value) => {
    const displayValue = typeof value === 'object' ? value.descripcion || 'N/A' : value;
    return (
      <div key={label} className="flex justify-between items-center py-2 px-4 even:bg-gray-50">
        <span className="text-gray-600 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className={`font-medium ${displayValue === 'Si' ? 'text-red-600' : 'text-gray-800'}`}>
          {displayValue || 'No'}
        </span>
      </div>
    );
  };

  const renderSeccion = (titulo, datos) => {
    const otroKey = Object.keys(datos).find(key => key.startsWith('otro_'));
    const otroVal = otroKey ? datos[otroKey] : null;

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">{titulo}</h3>
        <div className="grid grid-cols-1 gap-1">
          {Object.entries(datos)
            .filter(([key]) => !key.startsWith('otro_'))
            .map(([key, val]) => renderCampo(key, val))}
          {otroVal && renderCampo('Otro', otroVal)}
        </div>
      </div>
    );
  };

  const renderBotonAccion = () => (
    <button
      onClick={() => setEditMode(true)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
      </svg>
      {examenExistente ? 'Editar Examen' : 'Crear Examen'}
    </button>
  );

  if (loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Examen Estomatológico</h2>
          {!editMode && renderBotonAccion()}
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

        {!editMode && !examenExistente && (
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
            <p>No se ha registrado ningún examen estomatológico</p>
          </div>
        )}

        {!editMode && examenExistente && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Evaluación General</h3>
              {renderCampo('Músculos Masticadores', formData.musculos_masticadores)}
              {renderCampo('Sintomático', formData.sintomatico)}
              {renderCampo('Asintomático', formData.asintomatico)}
            </div>

            {renderSeccion('Labios', formData.labios)}
            {renderSeccion('Lengua', formData.lengua)}
            {renderSeccion('Piso de Boca', formData.pisoDeBoca)}
            {renderSeccion('Mejillas', formData.mejillas)}
            {renderSeccion('Paladar', formData.paladar)}
            {renderSeccion('Maxilares', formData.maxilares)}
          </div>
        )}

        {editMode && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-8">
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Evaluación General</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RadioGroup 
                  label="Músculos Masticadores"
                  name="musculos_masticadores"
                  value={formData.musculos_masticadores || "No"}
                  onChange={(name, value) => handleGeneralChange(name, value)}
                  options={['Si', 'No']}
                  inline
                />

                <RadioGroup 
                  label="Sintomático"
                  name="sintomatico"
                  value={formData.sintomatico || "No"}
                  onChange={(name, value) => handleGeneralChange(name, value)}
                  options={['Si', 'No']}
                  inline
                />

                <RadioGroup 
                  label="Asintomático"
                  name="asintomatico"
                  value={formData.asintomatico || "No"}
                  onChange={(name, value) => handleGeneralChange(name, value)}
                  options={['Si', 'No']}
                  inline
                />
              </div>
            </div>

              <SeccionLabios data={formData.labios} onChange={(data) => handleSectionChange('labios', data)}/>
              <SeccionLengua data={formData.lengua} onChange={(data) => handleSectionChange('lengua', data)}/>
              <SeccionPisoDeBoca data={formData.pisoDeBoca} onChange={(data) => handleSectionChange('pisoDeBoca', data)}/>
              <SeccionMejillas data={formData.mejillas} onChange={(data) => handleSectionChange('mejillas', data)}/>
              <SeccionPaladar data={formData.paladar} onChange={(data) => handleSectionChange('paladar', data)}/>
              <SeccionMaxilares data={formData.maxilares} onChange={(data) => handleSectionChange('maxilares', data)}/>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                  {examenExistente ? 'Actualizar' : 'Crear Examen'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExamenEstomatologico;