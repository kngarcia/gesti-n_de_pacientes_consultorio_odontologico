import axios from 'axios';

const API_URL = 'http://localhost:3000/api/diagnostico-general';

const diagnosticoGeneralService = {
  obtenerDiagnostico: (patientId) => {
    return axios.get(`${API_URL}/paciente/${patientId}`);
  },

  crearDiagnostico: (patientId, data) => {
    return axios.post(`${API_URL}/paciente/${patientId}`, data);
  },

  actualizarDiagnostico: (patientId, data) => {
    return axios.put(`${API_URL}/paciente/${patientId}`, data);
  }
};

export default diagnosticoGeneralService;