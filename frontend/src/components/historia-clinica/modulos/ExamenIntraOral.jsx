import React, { useState } from "react";
import SeccionEncias from "./SeccionEncias";
import SeccionTextura from "./SeccionTextura";
import SeccionMucosas from "./SeccionMucosas";
import SeccionTejidosDuros from "./SeccionTejidosDuros";

const ExamenIntraOral = ({ onSubmit, initialData, onBack }) => {
  const [intraOralData, setIntraOralData] = useState({
    observaciones: initialData?.observaciones || "",
    encias: initialData?.encias || { sana: "No", enrojecida: "No", inflamada: "No", sangrante: "No" },
    textura: initialData?.textura || { punteado_naranja: "No", lisa: "No", naranja: "No" },
    mucosas: initialData?.mucosas || { rosadas: "No", rojas: "No" },
    tejidosDuros: initialData?.tejidosDuros || {
      atrision: "No", abrasion: "No", erosion: "No", mal_posicion: "No",
      diastema: "No", des_line_m_dental: "No", alteracion_tamano: "No",
      alteracion_forma: "No", alteracion_numero: "No", facetas_desgaste: "No", manchas: "No"
    }
  });

  const handleSectionChange = (section, data) => {
    setIntraOralData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(intraOralData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Examen Intraoral</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SeccionEncias data={intraOralData.encias} onChange={(data) => handleSectionChange('encias', data)} />
          <SeccionTextura data={intraOralData.textura} onChange={(data) => handleSectionChange('textura', data)} />
          <SeccionMucosas data={intraOralData.mucosas} onChange={(data) => handleSectionChange('mucosas', data)} />
        </div>
        
        <div className="space-y-6">
          <SeccionTejidosDuros data={intraOralData.tejidosDuros} onChange={(data) => handleSectionChange('tejidosDuros', data)} />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones Adicionales</label>
        <textarea
          value={intraOralData.observaciones}
          onChange={(e) => setIntraOralData(prev => ({ ...prev, observaciones: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          rows="3"
          placeholder="Registre observaciones relevantes..."
        />
      </div>

      <div className="flex justify-between gap-4 pt-6">
        <button type="button" onClick={onBack} className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
          ← Volver
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
          Guardar Examen
        </button>
      </div>
    </form>
  );
};

export default ExamenIntraOral;