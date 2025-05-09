import axios from 'axios';
const API_URL = 'http://localhost:3000/api/pronostico';

const pronosticoService = {
  obtenerTodo: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/pronosticos/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error obteniendo datos');
    }
  },

  crear: async (patientId, data) => {
    try {
      const response = await axios.post(`${API_URL}/pronosticos/${patientId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creando registro');
    }
  },

  actualizar: async (patientId, data) => {
    try {
      const response = await axios.put(`${API_URL}/pronosticos/${patientId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error actualizando registro');
    }
  }
};

export default pronosticoService;