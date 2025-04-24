import React from 'react';
import RadioGroup from './RadioGroup';
const SeccionMaxilares = ({ data, onChange }) => {
    const handleChange = (name, value) => {
        onChange({ ...data, [name]: value });
    };

    return (
        <div classnml="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Maxilares</h3>
            <RadioGroup label="Macrognasia" name="macrognasia" value={data.macrognasia} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Micrognasia" name="micrognasia" value={data.micrognasia} onChange={handleChange} options={["Si", "No"]}/>
            <RadioGroup label="Torus Mandibular" name="torus_mandibular" value={data.torus_mandibular} onChange={handleChange} options={["Si", "No"]}/>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Otro</label>
                <input  
                    type="text"
                    name="otro_maxilares"
                    value={data.otro}
                    onChange={(e) => handleChange('otro_maxilares', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>


        </div>
    )
}

export default SeccionMaxilares;