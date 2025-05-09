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
        <button type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
          </svg>
          
          Guardar Examen
        </button>
      </div>
    </form>
  );
};

export default ExamenIntraOral;