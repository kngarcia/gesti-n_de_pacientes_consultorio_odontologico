import React from "react";
import RadioGroup from "./RadioGroup";

const AnomaliasATM = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };
    
    return (
        <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Anomalías ATM</h3>
        <RadioGroup label="Ruido Articular" name="ruido_articular" value={data.ruido_articular} onChange={handleChange} options={["Si", "No"]} />
        <RadioGroup label="Difusión Dolorosa" name="difusion_dolorosa" value={data.difusion_dolorosa} onChange={handleChange} options={["Si", "No"]} />
        <RadioGroup label="Limitación Apertura" name="limitacion_apertura" value={data.limitacion_apertura} onChange={handleChange} options={["Si", "No"]} />
        </div>
    );
}

export default AnomaliasATM;