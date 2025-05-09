import React from "react";
import RadioGroup from "./RadioGroup";

const PlanoHorizontal = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };
    
    return (
        <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Plano Horizontal</h3>
        <RadioGroup label="Mordida Cruzada Anterior" name="mordida_cruzada_anterior" value={data.mordida_cruzada_anterior} onChange={handleChange} options={["Si", "No"]} />
        <RadioGroup label="Mordida Cruzada Exterior" name="mordida_cruzada_exterior" value={data.mordida_cruzada_exterior} onChange={handleChange} options={["Si", "No"]} />
        <RadioGroup label="Mordida Borde a Borde" name="mordida_borde_a_borde" value={data.mordida_borde_a_borde} onChange={handleChange} options={["Si", "No"]} />
        </div>
    );
}

export default PlanoHorizontal;