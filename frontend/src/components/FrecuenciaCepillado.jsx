import React, { useState, useEffect } from "react";
import axios from "axios";

const FrecuenciaCepillado = () => {
  const [frecuencias, setFrecuencias] = useState([]);
  const [formData, setFormData] = useState({
    id_historia: "",
    cepillado_veces_dia: "0",
    ceda_detal_veces_al_dia: "0",
    ultima_visita_odontologo: "",
    observaciones: "",
  });

  useEffect(() => {
    fetchFrecuencias();
  }, []);

  const fetchFrecuencias = async () => {
    try {
      const response = await axios.get("http://localhost:5000/frecuencia");
      setFrecuencias(response.data);
    } catch (error) {
      console.error("Error al obtener las frecuencias", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/frecuencia", formData);
      fetchFrecuencias();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-screen">
      <div className="flex justify-between items-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          3. Frecuencia del Cepillado
        </h2>
      </div>

      <form className="space-y-8">
        {/* Cepillado Cuántas Veces */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ¿Cepillado cuántas veces al día?
          </label>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, "5 o más"].map((value) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="cepillado"
                  value={value}
                  className="form-radio"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ceda dental Cuántas Veces */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ¿Ceda dental cuántas veces al día?
          </label>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, "5 o más"].map((value) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="ceda_dental"
                  value={value}
                  className="form-radio"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Última Visita al Odontólogo */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ¿Última visita al odontólogo?
          </label>
          <input
            type="date"
            name="ultima_visita"
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>

        {/* Observaciones */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            rows={4}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Ingrese observaciones relevantes..."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onBack}
          >
            Atrás
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FrecuenciaCepillado;
