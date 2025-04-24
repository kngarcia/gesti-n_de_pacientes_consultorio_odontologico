import React from "react";
import RadioGroup from "./RadioGroup";

const SeccionEncias = ({ data, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Encías</h3>
      <RadioGroup label="Sana" name="sana" value={data.sana} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Enrojecida" name="enrojecida" value={data.enrojecida} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Inflamada" name="inflamada" value={data.inflamada} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Sangrante" name="sangrante" value={data.sangrante} onChange={handleChange} options={["Si", "No"]} />
    </div>
  );
};

export default SeccionEncias;