import EditableField from './EditableField';

const PersonalDataSection = ({ isEditing, formData, handleInputChange }) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      Datos Personales
    </h3>
    
    <div className="space-y-4">
      <EditableField
        label="Fecha de Nacimiento"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleInputChange}
        isEditing={isEditing}
        type="date"
        inputClassName="bg-white"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditableField
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="select"
          options={[
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Femenino', label: 'Femenino' },
            { value: 'Otro', label: 'Otro' }
          ]}
          placeholder="Seleccionar"
          inputClassName="bg-white"
        />
        
        <EditableField
          label="Estado Civil"
          name="estado_civil"
          value={formData.estado_civil}
          onChange={handleInputChange}
          isEditing={isEditing}
          type='select'
          options={[
            { value: 'Soltero', label: 'Soltero' },
            { value: 'Casado', label: 'Casado' },
            { value: 'Divorciado', label: 'Divorciado' },
            { value: 'Viudo', label: 'Viudo' },
            { value: 'Union Libre', label: 'Unión Libre' }
          ]}
          placeholder='Seleccionar'
          inputClassName="bg-white"
        />
      </div>
      
      <EditableField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleInputChange}
        isEditing={isEditing}
        type="textarea"
        displayClassName="bg-white"
      />

      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Acompañante</h4>
        <EditableField
          label="Nombre"
          name="nombre_acompanante"
          value={formData.nombre_acompanante}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="text"
          inputClassName="bg-white"
        />
        
        <EditableField
          label="Teléfono"
          name="telefono_acompanante"
          value={formData.telefono_acompanante}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="tel"
          inputClassName="bg-white"
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Responsable</h4>
        <EditableField
          label="Nombre del Responsable"
          name="nombre_responsable"
          value={formData.nombre_responsable}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="text"
          inputClassName="bg-white"
        />
        
        <EditableField
          label="Parentesco"
          name="parentesco_responsable"
          value={formData.parentesco_responsable}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="text"
          inputClassName="bg-white"
        />
        
        <EditableField
          label="Teléfono del Responsable"
          name="telefono_responsable"
          value={formData.telefono_responsable}
          onChange={handleInputChange}
          isEditing={isEditing}
          type="tel"
          inputClassName="bg-white"
        />

      </div>      
    </div>
  </div>
);
export default PersonalDataSection;