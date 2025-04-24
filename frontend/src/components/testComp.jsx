import React, { useState } from "react";
import RadioGroup from "./RadioGroup";

const ExamenExtraOral = ({ onSubmit, initialData, onBack }) => {
  const [formData, setFormData] = useState(initialData || {
    adenopatias: "No",
    derecho: "No",
    izquierdo: "No",
    sintomatico: "No",
    asintomatico: "No",
    otros_adenopatias: "",
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name] === "Si" ? "No" : "Si"
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarDatos()) return;
    onSubmit(formData);
  };

  const validarDatos = () => {
    if (formData.adenopatias === "Si" && 
       formData.derecho === "No" && 
       formData.izquierdo === "No" &&
       !formData.otros_adenopatias.trim()) {
      alert("Debe especificar al menos un tipo de adenopatía");
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Adenopatías</h3>
          
          <RadioGroup
            label="¿Presenta adenopatías?"
            name="adenopatias"
            value={formData.adenopatias}
            onChange={handleChange}
            options={["Si", "No"]}
          />

          {formData.adenopatias === "Si" && (
            <div className="ml-4 space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.derecho === "Si"}
                    onChange={() => handleCheckboxChange("derecho")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Derecho</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.izquierdo === "Si"}
                    onChange={() => handleCheckboxChange("izquierdo")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Izquierdo</span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Especificar otro tipo de adenopatías
                </label>
                <textarea
                  value={formData.otros_adenopatias}
                  onChange={(e) => handleChange("otros_adenopatias", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows="2"
                  placeholder="Describa otros tipos de adenopatías..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sintomatología</h3>
          
          <div className="space-y-2">
            <RadioGroup
              label="Sintomático"
              name="sintomatico"
              value={formData.sintomatico}
              onChange={handleChange}
              options={["Si", "No"]}
            />
            
            <RadioGroup
              label="Asintomático"
              name="asintomatico"
              value={formData.asintomatico}
              onChange={handleChange}
              options={["Si", "No"]}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Volver
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExamenExtraOral;