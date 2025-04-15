import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Odontograma from "./Odontograma";

const ExamenOral = ({ onBack }) => {
  const navigate = useNavigate();
  const [mostrarOdontograma, setMostrarOdontograma] = useState(false);

  // Estado para los datos de examen extra e intraoral
  const [formData, setFormData] = useState({
    adenopatias: "No",
    derecho: "No",
    izquierdo: "No",
    sintomatologia: "", // Radio (sintomático / asintomático)
    observaciones_intraoral: "", // Observaciones adicionales
    otros_adenopatias: "", // NUEVO: Indicar otro tipo de adenopatías
  });

  const [intraOralData, setIntraOralData] = useState({
    textura_punteado_naranja: "No",
    textura_llisa: "No",
    textura_naranja: "No",

    tejidos_duros_atriston: "No",
    tejidos_duros_abrasion: "No",
    tejidos_duros_erosion: "No",
    tejidos_duros_malposicion: "No",
    tejidos_duros_diastema: "No",
    tejidos_duros_des_line_m_dental: "No",
    tejidos_duros_alteracion_tamano: "No",
    tejidos_duros_alteracion_forma: "No",
    tejidos_duros_alteracion_numero: "No",
    tejidos_duros_facetas_desgaste: "No",
    tejidos_duros_manchas: "No",

    mucosas_rosadas: "No",
    mucosas_rojas: "No",

    encias_sana: "No",
    encias_enrojecida: "No",
    encias_inflamada: "No",
    encias_sangrante: "No",

    observaciones: "",
  });

  // Manejadores de cambio
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIntraOralChange = (e) => {
    setIntraOralData({ ...intraOralData, [e.target.name]: e.target.value });
  };

  // Función genérica para crear secciones con radio buttons
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
                  checked={intraOralData[name] === "Si"}
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
                  checked={intraOralData[name] === "No"}
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

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const allData = { ...formData, ...intraOralData };
    console.log("Datos enviados:", allData);
    // Aquí podrías enviar a tu API o backend
  };

  // Renderizado condicional para mostrar ExamenEstomatologico
  if (mostrarOdontograma) {
    return <Odontograma onBack={() => setMostrarOdontograma(false)} />;
  }

  return (
    <div className="w-full min-h-screen p-6">
      <div className="flex justify-between items-start mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Examen Clínico Oral
        </h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Sección ExtraOral */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Examen ExtraOral
          </h3>
          <div className="space-y-4">
            {/* Adenopatías */}
            <div className="flex flex-col gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Adenopatías</span>
                <div className="flex gap-4">
                  {["Si", "No"].map((opcion) => (
                    <label
                      key={opcion}
                      className="flex items-center space-x-1 text-gray-700"
                    >
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
              {/* Nuevo campo para indicar otro tipo de adenopatías */}
              <div className="mt-4">
                <label
                  htmlFor="otros_adenopatias"
                  className="block text-gray-700 mb-1 text-sm font-medium"
                >
                  Otro tipo de adenopatías (especifique)
                </label>
                <textarea
                  id="otros_adenopatias"
                  name="otros_adenopatias"
                  value={formData.otros_adenopatias}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="2"
                  placeholder="Ingrese otros tipos de adenopatías..."
                ></textarea>
              </div>
            </div>

            {/* Localización y Sintomatología */}
            <div className="ml-4 space-y-4">
              <div className="space-y-3 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Localización</span>
                  <div className="flex gap-4">
                    {["derecho", "izquierdo"].map((lado) => (
                      <label
                        key={lado}
                        className="flex items-center space-x-1 text-gray-700"
                      >
                        <input
                          type="checkbox"
                          name={lado}
                          checked={formData[lado] === "Si"}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: lado,
                                value: e.target.checked ? "Si" : "No",
                              },
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
                    {["sintomatico", "asintomatico"].map((tipo) => (
                      <label
                        key={tipo}
                        className="flex items-center space-x-1 text-gray-700"
                      >
                        <input
                          type="radio"
                          name="sintomatologia"
                          value={tipo}
                          checked={formData.sintomatologia === tipo}
                          onChange={handleChange}
                          className="form-radio h-5 w-5 border-2 border-gray-300 text-blue-600"
                        />
                        <span className="capitalize text-sm">{tipo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Observaciones de Sintomatología */}
                <div className="mt-4">
                  <label
                    htmlFor="observaciones_sintomatologia"
                    className="block text-gray-700 mb-1 text-sm font-medium"
                  >
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones_sintomatologia"
                    name="observaciones_intraoral"
                    value={formData.observaciones_intraoral}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows="2"
                    placeholder="Detalles adicionales..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección IntraOral */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Examen IntraOral
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-6">
              {createSection("Encias", [
                ["Sana", "encias_sana"],
                ["Enrojecida", "encias_enrojecida"],
                ["Inflamada", "encias_inflamada"],
                ["Sangrante", "encias_sangrante"],
              ])}
              {createSection("Textura", [
                ["Punteado Naranja", "textura_punteado_naranja"],
                ["Lilás", "textura_llisa"],
                ["Naranja", "textura_naranja"],
              ])}

              {createSection("Mucosas", [
                ["Rosadas", "mucosas_rosadas"],
                ["Rojas", "mucosas_rojas"],
              ])}
            </div>

            {/* Columna Derecha */}
            <div className="space-y-6">
              {createSection("Tejidos Duros", [
                ["Atristión", "tejidos_duros_atriston"],
                ["Abrasión", "tejidos_duros_abrasion"],
                ["Erosión", "tejidos_duros_erosion"],
                ["Mal Posición", "tejidos_duros_malposicion"],
                ["Des. Línea M Dental", "tejidos_duros_des_line_m_dental"],
                ["Alteración Tamaño", "tejidos_duros_alteracion_tamano"],
                ["Alteración Forma", "tejidos_duros_alteracion_forma"],
                ["Facetas de Desgaste", "tejidos_duros_facetas_desgaste"],
                ["Manchas", "tejidos_duros_manchas"],
              ])}
            </div>
          </div>

          {/* Observaciones IntraOrales */}
          <div className="mt-6">
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="observaciones"
            >
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
            onClick={() => setMostrarOdontograma(true)}
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
