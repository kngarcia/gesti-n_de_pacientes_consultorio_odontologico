const EditableField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    isEditing, 
    type = 'text', 
    required = false, 
    options = [], 
    placeholder = '', 
    className = '',
    inputClassName = '',
    displayClassName = '',
    disabled = false
  }) => {
    const handleRadioChange = (e) => {
      onChange({
        target: {
          name: name,
          value: e.target.value
        }
      });
    };
  
    // Estilo base para inputs
    const baseInputClasses = "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200";
  
    return (
      <div className={`mb-5 ${className}`}>
        <label className={`block text-sm font-medium mb-2 ${required ? 'text-gray-700' : 'text-gray-600'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {isEditing ? (
          <>
            {type === 'select' ? (
              <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} ${inputClassName} appearance-none bg-white`}
                required={required}
                disabled={disabled}
              >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === 'textarea' ? (
              <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} ${inputClassName} min-h-[100px]`}
                rows={4}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
              />
            ) : type === 'radio-group' ? (
              <div className="flex flex-wrap gap-4">
                {options.map(option => (
                  <label key={option.value} className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={value === option.value}
                      onChange={handleRadioChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      disabled={disabled}
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} ${inputClassName}`}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
              />
            )}
          </>
        ) : (
          <div className={`p-3 rounded-lg ${value ? 'bg-gray-50 text-gray-800' : 'bg-gray-50 text-gray-400 italic'} ${displayClassName}`}>
            {value || 'No especificado'}
          </div>
        )}
      </div>
    );
  };

export default EditableField;