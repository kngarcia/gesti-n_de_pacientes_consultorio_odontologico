import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionPaladar = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Paladar</h3>
            <RadioGroup label="Ojival" name="ojival" value={data.ojival} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Fisurado" name="fisurado" value={data.fisurado} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Torus Palatino" name="torus_platino" value={data.torus_platino} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Palatitis Protesica" name="palatitis_protesica" value={data.palatitis_protesica} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input  
                    type="text"
                    name="otro_paladar"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_paladar', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionPaladar;