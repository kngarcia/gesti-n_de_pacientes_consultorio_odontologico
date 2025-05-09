import axios from 'axios';

const API_URL = 'http://localhost:3000/api/oclusion';

export const oclusionService = {
  crearOclusion: (patientId, data) => 
    axios.post(`${API_URL}/paciente/${patientId}`, data),
  
  obtenerOclusion: (patientId) => 
    axios.get(`${API_URL}/paciente/${patientId}`),
  
  actualizarOclusion: (patientId, data) => 
    axios.put(`${API_URL}/paciente/${patientId}`, data)
};