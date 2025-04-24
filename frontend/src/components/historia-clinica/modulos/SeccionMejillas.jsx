import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionMejillas = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3"> Mejillas</h3>
            <RadioGroup label="Aftas" name="aftas_mejillas" value={data.aftas_mejillas} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Herpes" name="herpes_mejillas" value={data.herpes_mejillas} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Liquen Plano" name="liquen_plano" value={data.liquen_plano} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input
                    type="text"
                    name="otro_mejillas"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_mejillas', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionMejillas;