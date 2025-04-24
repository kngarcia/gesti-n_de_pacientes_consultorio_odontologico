import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionPisoDeBoca = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Piso de Boca</h3>
            <RadioGroup label="Mucocele" name="mucocele_piso_boca" value={data.mucocele_piso_boca} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Ranula" name="ranula" value={data.ranula} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Leucoplasia" name="leucoplasia" value={data.leucoplasia} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Aftas" name="aftas_piso_boca" value={data.aftas_piso_boca} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input
                    type="text"
                    name="otro_piso_boca"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_piso_boca', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionPisoDeBoca;