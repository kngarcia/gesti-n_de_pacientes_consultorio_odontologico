import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionLabios = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Labios</h3>
            <RadioGroup label="Herpes" name="herpes_labios" value={data.herpes_labios} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Quelitis Angular" name="quelitis_angular" value={data.quelitis_angular} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Mucocele" name="mucocele_labios" value={data.mucocele_labios} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Frenillo Hipertrofico" name="frenillo_hipertrofico" value={data.frenillo_hipertrofico} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="leocoplasia" name="leocoplasia" value={data.leocoplasia} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input
                    type="text"
                    name="otro_labios"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_labios', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionLabios;