import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamenEstomatologico from './ExamenEstomatologico'

const ExamenOral = ({ onBack }) => {
  const navigate = useNavigate();
  const [mostrarExamenEstomatologico, setMostrarExamenEstomatologico] = useState(false);

  const [formData, setFormData] = useState({
    adenopatias: 'No',
    derecho: 'No',
    izquierdo: 'No',
    sintomatologia: '', // Un único campo para el grupo de radio
  });

  const [intraOralData, setIntraOralData] = useState({
    textura_punteojo: 'No',
    textura_llisa: 'No',
    textura_maravia: 'No',
    tejidos_duros_atriston: 'No',
    tejidos_duros_ambason: 'No',
    tejidos_duros_erosion: 'No',
    tejidos_duros_malposicion: 'No',
    encias_sana: 'No',
    encias_enrojecida: 'No',
    encias_inflamada: 'No',
    encias_sangrante: 'No',
    diastema_desune: 'No',
    diastema_tamano: 'No',
    diastema_forma: 'No',
    mucosas_rosadas: 'No',
    mucosas_rojas: 'No',
    alteracion_facetas: 'No',
    alteracion_manchas: 'No',
    observaciones: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIntraOralChange = (e) => {
    setIntraOralData({ ...intraOralData, [e.target.name]: e.target.value });
  };

  const createSection = (title, items) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map(([label, name]) => (
          <div key={name} className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">{label}</span>
            <div className="flex gap-4">
              <label className="flex items-center space-x-1 text-gray-700">
                <input
                  type="radio"
                  name={name}
                  value="Si"
                  checked={intraOralData[name] === 'Si'}
                  onChange={handleIntraOralChange}
                  className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                />
                <span className="text-sm">Si</span>
              </label>
              <label className="flex items-center space-x-1 text-gray-700">
                <input
                  type="radio"
                  name={name}
                  value="No"
                  checked={intraOralData[name] === 'No'}
                  onChange={handleIntraOralChange}
                  className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const allData = { ...formData, ...intraOralData };
    console.log('Datos enviados:', allData);
    // Lógica para enviar a tu API
  };
  if (mostrarExamenEstomatologico) {
    return <ExamenEstomatologico onBack={() => setMostrarExamenEstomatologico(false)} />;
  }

  return (
    <div className="w-full min-h-screen p-6">
      <div className="flex justify-between items-start mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Examen Clínico Oral</h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Sección ExtraOral */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Examen ExtraOral</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Adenopatías</span>
              <div className="flex gap-4">
                {['Si', 'No'].map((opcion) => (
                  <label key={opcion} className="flex items-center space-x-1 text-gray-700">
                    <input
                      type="radio"
                      name="adenopatias"
                      value={opcion}
                      checked={formData.adenopatias === opcion}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">{opcion}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Datos adicionales siempre visibles */}
            <div className="ml-4 space-y-4">
              <div className="space-y-3 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Localización</span>
                  <div className="flex gap-4">
                    {['derecho', 'izquierdo'].map((lado) => (
                      <label key={lado} className="flex items-center space-x-1 text-gray-700">
                        <input
                          type="checkbox"
                          name={lado}
                          checked={formData[lado] === 'Si'}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: lado,
                                value: e.target.checked ? 'Si' : 'No'
                              }
                            })
                          }
                          className="form-checkbox h-5 w-5 text-blue-600 rounded-full border-2 border-gray-300"
                        />
                        <span className="capitalize text-sm">{lado}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Sintomatología</span>
                  <div className="flex gap-4">
                    {['sintomatico', 'asintomatico'].map((tipo) => (
                      <label key={tipo} className="flex items-center space-x-1 text-gray-700">
                        <input
                          type="radio"
                          name="sintomatologia"
                          value={tipo}
                          checked={formData.sintomatologia === tipo}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: 'sintomatologia',
                                value: e.target.value
                              }
                            })
                          }
                          className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                        />
                        <span className="capitalize text-sm">{tipo}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección IntraOral */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Examen IntraOral</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-6">
              {createSection("Textura", [
                ['Punteojo Maravía', 'textura_punteojo'],
                ['Lilás', 'textura_llisa'],
                ['Maravía', 'textura_maravia']
              ])}

              {createSection("Encias", [
                ['Sana', 'encias_sana'],
                ['Enrojecida', 'encias_enrojecida'],
                ['Inflamada', 'encias_inflamada'],
                ['Sangrante', 'encias_sangrante']
              ])}

              {createSection("Mucosas", [
                ['Rosadas', 'mucosas_rosadas'],
                ['Rojas', 'mucosas_rojas']
              ])}
            </div>

            {/* Columna Derecha */}
            <div className="space-y-6">
              {createSection("Tejidos Duros", [
                ['Atristión', 'tejidos_duros_atriston'],
                ['Ambasión', 'tejidos_duros_ambason'],
                ['Erosión', 'tejidos_duros_erosion'],
                ['Mal Posición', 'tejidos_duros_malposicion']
              ])}

              {createSection("Diastema", [
                ['Des. Une, M. Dejital', 'diastema_desune'],
                ['Alteración Tamaño', 'diastema_tamano'],
                ['Alteración Forma', 'diastema_forma']
              ])}

              {createSection("Alteración Número", [
                ['Facetas de Desgaste', 'alteracion_facetas'],
                ['Manchas', 'alteracion_manchas']
              ])}
            </div>
          </div>

          {/* Nuevo campo de Observaciones */}
          <div className="mt-6">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="observaciones">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={intraOralData.observaciones}
              onChange={handleIntraOralChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
              placeholder="Ingresa tus observaciones aquí..."
            ></textarea>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 pt-8 border-t mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={() => setMostrarExamenEstomatologico(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamenOral;
