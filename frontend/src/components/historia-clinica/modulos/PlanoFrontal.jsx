import React from "react";
import RadioGroup from "./RadioGroup";

const PlanoFrontal = ({ data, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Plano Frontal</h3>
      <RadioGroup label="Mordida Abierta" name="mordedura_abierta" value={data.mordedura_abierta} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Mordida Profunda" name="mordedura_profunda" value={data.mordedura_profunda} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Sobremordida Vertical" name="sobremordida_vertical" value={data.sobremordida_vertical} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Sobremordida Horizontal" name="sobre_mordida_horizontal" value={data.sobre_mordida_horizontal} onChange={handleChange} options={["Si", "No"]} />
    </div>
  );
}

export default PlanoFrontal;