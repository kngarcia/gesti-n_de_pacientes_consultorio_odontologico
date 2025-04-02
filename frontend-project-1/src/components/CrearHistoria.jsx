import React, { useState } from 'react';
import './CrearHistoria.css';

const CrearHistoria = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        patientAge: '',
        medicalHistory: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="crear-historia">
            <h2>Crear Historia Clínica</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="patientName">Nombre del Paciente:</label>
                    <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="patientAge">Edad del Paciente:</label>
                    <input
                        type="number"
                        id="patientAge"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="medicalHistory">Historia Médica:</label>
                    <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear Historia</button>
            </form>
        </div>
    );
};

export default CrearHistoria;