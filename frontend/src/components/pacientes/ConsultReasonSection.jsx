import EditableField from './EditableField';

const ConsultReasonSection = ({ isEditing, formData, handleInputChange }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Motivo de Consulta</h3>
    <EditableField
      name="motivo_consulta"
      value={formData.motivo_consulta}
      onChange={handleInputChange}
      isEditing={isEditing}
      type="textarea"
      className="mb-0"
    />
  </div>
);

export default ConsultReasonSection;