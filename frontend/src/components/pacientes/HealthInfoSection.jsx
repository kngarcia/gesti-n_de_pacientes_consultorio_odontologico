import EditableField from './EditableField';

const HealthInfoSection = ({ isEditing, formData, handleInputChange, setFormData }) => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-blue-200 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Información de Salud
    </h3>
    
    <div className="space-y-4">
      <EditableField
        label="EPS"
        name="eps"
        value={formData.eps}
        onChange={handleInputChange}
        isEditing={isEditing}
        required
        inputClassName="bg-white"
      />
      
      <EditableField
        label="Tipo de Afiliación"
        name="tipo_afiliacion"
        value={formData.cotizante === 'Si' ? 'cotizante' : 'beneficiario'}
        onChange={(e) => {
          setFormData({
            ...formData,
            cotizante: e.target.value === 'cotizante' ? 'Si' : 'No',
            beneficiario: e.target.value === 'beneficiario' ? 'Si' : 'No'
          });
        }}
        isEditing={isEditing}
        type="radio-group"
        options={[
          { value: 'cotizante', label: 'Cotizante' },
          { value: 'beneficiario', label: 'Beneficiario' }
        ]}
      />
      
      <EditableField
        label="Origen de Enfermedad"
        name="origen_enfermedad"
        value={formData.origen_enfermedad}
        onChange={handleInputChange}
        isEditing={isEditing}
        type="select"
        required
        options={[
          { value: 'Paciente sano', label: 'Paciente sano' },
          { value: 'Enfermedad general o común', label: 'Enfermedad general/común' },
          { value: 'Enfermedad profesional o ocupacional', label: 'Enfermedad profesional/ocupacional' },
          { value: 'Accidente de trabajo', label: 'Accidente de trabajo' },
          { value: 'Accidente no de trabajo o fuera del trabajo', label: 'Accidente no laboral' }
        ]}
        inputClassName="bg-white"
      />
    </div>
  </div>
);

export default HealthInfoSection;