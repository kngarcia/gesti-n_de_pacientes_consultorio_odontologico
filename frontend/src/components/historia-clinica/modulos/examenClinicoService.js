import axios from 'axios';

const API_URL = 'http://localhost:3000/api/examen-clinico';
export const examenService = {
  crearExamen: (patientId, data) => axios.post(`${API_URL}/paciente/${patientId}`, data),
  obtenerPorPaciente: (patientId) => axios.get(`${API_URL}/paciente/${patientId}`),
};