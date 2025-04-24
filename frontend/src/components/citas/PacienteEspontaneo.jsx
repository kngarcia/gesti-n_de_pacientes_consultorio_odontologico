export const PacienteEspontaneo = ({ 
    formData, 
    handleChange, 
    submitting, 
    modoEdicion 
  }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-800">
        {modoEdicion ? "Datos del Paciente Espontáneo" : "Ingrese Datos del Paciente"}
      </h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre Completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nombre_espontaneo"
          value={formData.nombre_espontaneo}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium mb-1">
          Documento de Identidad
        </label>
        <input
          type="text"
          name="documento_espontaneo"
          value={formData.documento_espontaneo}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={submitting}
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="telefono_espontaneo"
          value={formData.telefono_espontaneo}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
        />
      </div>
    </div>
  );