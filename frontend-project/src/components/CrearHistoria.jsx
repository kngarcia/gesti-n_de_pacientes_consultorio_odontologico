import React, { useState } from 'react';
import './CrearHistoria.css';

const CrearHistoria = () => {
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            patientName,
            patientAge,
            medicalHistory,
        });
    };

    return (
        <div className="crear-historia">
            <h1>Crear Historia Clínica</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="patientName">Nombre del Paciente:</label>
                    <input
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="patientAge">Edad del Paciente:</label>
                    <input
                        type="number"
                        id="patientAge"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="medicalHistory">Historia Médica:</label>
                    <textarea
                        id="medicalHistory"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Historia</button>
            </form>
        </div>
    );
};

export default CrearHistoria;