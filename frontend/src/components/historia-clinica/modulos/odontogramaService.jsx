import axios from "axios";

const API_URL = "http://localhost:3000/api/odontograma";

export const odontogramaService = {
  crearOdontograma: (patientId, data) =>
    axios.post(`${API_URL}/paciente/${patientId}`, data),

  obtenerOdontograma: (patientId) =>
    axios.get(`${API_URL}/paciente/${patientId}`),
};

export default odontogramaService;