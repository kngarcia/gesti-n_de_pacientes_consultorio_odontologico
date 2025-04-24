import React from "react";
import RadioGroup from "./RadioGroup";

const SeccionTextura = ({ data, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Textura</h3>
      <RadioGroup label="Punteado Naranja" name="punteado_naranja" value={data.punteado_naranja} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Lisa" name="lisa" value={data.lisa} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Naranja" name="naranja" value={data.naranja} onChange={handleChange} options={["Si", "No"]} />
    </div>
  );
};

export default SeccionTextura;