import React from "react";
import RadioGroup from "./RadioGroup";

const SeccionMucosas = ({ data, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Mucosas</h3>
      <RadioGroup label="Rosadas" name="rosadas" value={data.rosadas} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Rojas" name="rojas" value={data.rojas} onChange={handleChange} options={["Si", "No"]} />
    </div>
  );
};

export default SeccionMucosas;