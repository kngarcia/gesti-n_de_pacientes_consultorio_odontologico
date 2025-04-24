import EditableField from './EditableField';

const PatientBasicInfo = ({ patient, isEditing, formData, handleInputChange }) => (
  <div className="mb-8">
    <EditableField
      label="Nombre Completo"
      name="nombre_completo"
      value={formData.nombre_completo}
      onChange={handleInputChange}
      isEditing={isEditing}
      required
    />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <EditableField
        label="Documento de Identidad"
        name="documento_identidad"
        value={formData.documento_identidad}
        onChange={handleInputChange}
        isEditing={isEditing}
        required
      />
      
      <EditableField
        label="Edad"
        name="edad"
        value={formData.edad}
        onChange={handleInputChange}
        isEditing={isEditing}
        type="number"
        required
      />
      
      <EditableField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
        onChange={handleInputChange}
        isEditing={isEditing}
        type="tel"
        required
      />
    </div>
  </div>
);

export default PatientBasicInfo;