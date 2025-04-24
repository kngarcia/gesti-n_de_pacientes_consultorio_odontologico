export const SelectorTipoPaciente = ({ 
    formData, 
    handleTipoPacienteChange, 
    submitting 
  }) => (
    <div>
      <label className="block text-sm font-medium mb-2">Tipo de Paciente</label>
      <div className="flex gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="tipo_paciente"
            checked={formData.tipo_paciente === "registrado"}
            onChange={() => handleTipoPacienteChange("registrado")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            disabled={submitting}
          />
          <span className="ml-2">Paciente Registrado</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="tipo_paciente"
            checked={formData.tipo_paciente === "espontaneo"}
            onChange={() => handleTipoPacienteChange("espontaneo")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            disabled={submitting}
          />
          <span className="ml-2">Paciente Espontáneo</span>
        </label>
      </div>
    </div>
  );