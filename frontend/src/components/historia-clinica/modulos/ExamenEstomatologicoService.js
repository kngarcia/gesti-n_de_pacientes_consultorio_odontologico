import axios from 'axios';

const API_URL = 'http://localhost:3000/api/examen-estomatologico';

export const examenEstomatologicoService = {
  crearEstomatologico: (patientId, data) => 
    axios.post(`${API_URL}/paciente/${patientId}`, data),
  
  obtenerEstomatologico: (patientId) => 
    axios.get(`${API_URL}/paciente/${patientId}`),
  
  actualizarEstomatologico: (patientId, data) => 
    axios.put(`${API_URL}/paciente/${patientId}`, data)
};