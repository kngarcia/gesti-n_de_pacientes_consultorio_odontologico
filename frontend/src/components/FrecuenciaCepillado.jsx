import React, { useState } from "react";

const FrecuenciaCepillado = ({ onBack }) => {
  const [formData, setFormData] = useState({
    cepillado_veces_dia: "1",  // Valor inicial válido
    ceda_detal_veces_al_dia: "1",
    ultima_visita_odontologo: "",
    observaciones: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!formData.ultima_visita_odontologo) {
      setError("La fecha de última visita es obligatoria");
      return;
    }

    setIsSubmitting(true);

    
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

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Cepillado Cuántas Veces */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ¿Cepillado cuántas veces al día? *
          </label>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, "5 o más"].map((value) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="cepillado_veces_dia"
                  value={value}
                  checked={formData.cepillado_veces_dia === value.toString()}
                  onChange={handleChange}
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
                  name="ceda_detal_veces_al_dia"
                  value={value}
                  checked={formData.ceda_detal_veces_al_dia === value.toString()}
                  onChange={handleChange}
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
            ¿Última visita al odontólogo? *
          </label>
          <input
            type="date"
            name="ultima_visita_odontologo"
            value={formData.ultima_visita_odontologo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
            required
          />
        </div>

        {/* Observaciones */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
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
            disabled={isSubmitting}
            className={`px-4 py-2 ${
              isSubmitting ? "bg-gray-400" : "bg-green-500"
            } text-white rounded-lg transition-colors`}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FrecuenciaCepillado;