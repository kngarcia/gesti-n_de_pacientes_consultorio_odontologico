// components/RadioGroup.jsx
const RadioGroup = ({ label, name, value, onChange, options, checkedValue }) => (
    <div className="flex items-center space-x-4 mb-3">
      <span className="text-gray-700 w-40">{label}</span>
      <div className="flex gap-4">
        {(options || ["Si", "No"]).map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={checkedValue || option}
              checked={value === (checkedValue || option)}
              onChange={() => onChange(name, checkedValue || option)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
  
  export default RadioGroup;