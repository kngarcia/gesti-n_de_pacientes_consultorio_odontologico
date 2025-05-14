import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner';
import frecuenciaCepilladoService from './frecuenciaCepilladoService';

const FrecuenciaCepillado = () => {
  const { patientId } = useParams();
  const [mode, setMode] = useState('create'); // 'create' | 'view'
  const [formData, setFormData] = useState({
    cepillado_veces_dia: '0',
    ceda_detal_veces_al_dia: '0',
    ultima_visita_odontologo: '',
    observaciones: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const opcionesFrecuencia = [
    { valor: '0', etiqueta: '0' },
    { valor: '1', etiqueta: '1' },
    { valor: '2', etiqueta: '2' },
    { valor: '3', etiqueta: '3' },
    { valor: '4', etiqueta: '4' },
    { valor: '+5', etiqueta: '5 o más' }
  ];

  // Cargar datos desde el backend al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const data = await frecuenciaCepilladoService.obtenerPorPaciente(patientId);
        if (data) {
          setFormData(data);
          setMode('view');
        } else {
          setMode('create');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Guardar datos (upsert)
      await frecuenciaCepilladoService.guardar(patientId, formData);
      // Recargar datos actualizados
      const response = await frecuenciaCepilladoService.obtenerPorPaciente(patientId);
      setFormData(response);
      setMode('view');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {loading && <Spinner size="small" />}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      {mode === 'create' ? (
        <Formulario
          formData={formData}
          opciones={opcionesFrecuencia}
          onChange={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <Vista
          data={formData}
          opciones={opcionesFrecuencia}
          onEdit={() => setMode('create')}
        />
      )}
    </div>
  );
};

export default FrecuenciaCepillado;

// Componente de Formulario
const Formulario = ({ formData, opciones, onChange, onSubmit, loading }) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    <CampoRadio
      label="¿Cuántas veces al día se cepilla los dientes?"
      name="cepillado_veces_dia"
      value={formData.cepillado_veces_dia}
      opciones={opciones}
      onChange={onChange}
    />

    <CampoRadio
      label="¿Cuántas veces al día usa hilo dental?"
      name="ceda_detal_veces_al_dia"
      value={formData.ceda_detal_veces_al_dia}
      opciones={opciones}
      onChange={onChange}
    />

    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        Última visita al odontólogo *
      </label>
      <input
        type="text"
        name="ultima_visita_odontologo"
        value={formData.ultima_visita_odontologo}
        onChange={(e) => onChange(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        className="w-full p-2 border rounded"
        placeholder="Ingrese la fecha o descripción de la última visita"
        required
      />
    </div>

    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">Observaciones</label>
      <textarea
        name="observaciones"
        value={formData.observaciones}
        onChange={(e) => onChange(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        rows="3"
        className="w-full p-2 border rounded"
        placeholder="Ingrese observaciones relevantes..."
      />
    </div>

    <div className="flex justify-end gap-4 pt-6 border-t mt-6">
      <button
        type="button"
        onClick={() =>
          onChange(prev => ({ 
            ...prev, 
            cepillado_veces_dia: '0', 
            ceda_detal_veces_al_dia: '0' 
          }))
        }
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        Reiniciar
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        disabled={loading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
        </svg>
        {loading ? <Spinner size="small" /> : 'Guardar'}
      </button>
    </div>
  </form>
);

// Componente de Vista
const Vista = ({ data, opciones, onEdit }) => {
  const getLabel = (value) =>
    opciones.find(op => op.valor === value)?.etiqueta || value;
  return (
    <div className="space-y-4">
      <ItemVista 
        label="Cepillado diario" 
        value={getLabel(data.cepillado_veces_dia)} 
      />
      <ItemVista 
        label="Uso de hilo dental" 
        value={getLabel(data.ceda_detal_veces_al_dia)} 
      />
      <ItemVista 
        label="Última visita al odontólogo" 
        value={data.ultima_visita_odontologo} 
      />
      <ItemVista 
        label="Observaciones" 
        value={data.observaciones || 'Ninguna'} 
      />
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
          Editar Frecuencia Cepillado
      </button>
    </div>
  );
};

const CampoRadio = ({ label, name, value, opciones, onChange }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 font-medium">{label}</label>
    <div className="flex flex-wrap gap-4">
      {opciones.map((opcion) => (
        <label key={opcion.valor} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={opcion.valor}
            checked={value === opcion.valor}
            onChange={(e) => onChange(prev => ({ ...prev, [name]: e.target.value }))}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span>{opcion.etiqueta}</span>
        </label>
      ))}
    </div>
  </div>
);

const ItemVista = ({ label, value }) => (
  <div className="border-b pb-2">
    <dt className="text-gray-600 font-medium">{label}</dt>
    <dd className="text-gray-800">{value}</dd>
  </div>
);
