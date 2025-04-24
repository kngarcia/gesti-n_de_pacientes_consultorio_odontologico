import React from "react";
import RadioGroup from "./RadioGroup";

const SeccionTejidosDuros = ({ data, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Tejidos Duros</h3>
      <RadioGroup label="Atrisión" name="atrision" value={data.atrision} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Abrasión" name="abrasion" value={data.abrasion} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Erosión" name="erosion" value={data.erosion} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Mal posición" name="mal_posicion" value={data.mal_posicion} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Diastema" name="diastema" value={data.diastema} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Delineamiento Dental" name="des_line_m_dental" value={data.des_line_m_dental} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Alteración del tamaño" name="alteracion_tamano" value={data.alteracion_tamano} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Alteración de la forma" name="alteracion_forma" value={data.alteracion_forma} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Alteración del número" name="alteracion_numero" value={data.alteracion_numero} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Facetas de desgaste" name="facetas_desgaste" value={data.facetas_desgaste} onChange={handleChange} options={["Si", "No"]} />
      <RadioGroup label="Manchas" name="manchas" value={data.manchas} onChange={handleChange} options={["Si", "No"]} />
    </div>
  );
};

export default SeccionTejidosDuros;