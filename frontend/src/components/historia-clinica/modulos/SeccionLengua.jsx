import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionLengua = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Lengua</h3>
            <RadioGroup label="Macroglosia" name="macroglosia" value={data.macroglosia} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Microglosia" name="microglosia" value={data.microglosia} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Geográfica" name="geografica" value={data.geografica} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Fisurada" name="fisurada" value={data.fisurada} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Saburral" name="saburral" value={data.saburral} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input
                    type="text"
                    name="otro_lengua"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_lengua', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionLengua;