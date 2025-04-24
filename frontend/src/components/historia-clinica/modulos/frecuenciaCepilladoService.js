import axios from 'axios';

export default {
  // Obtiene el registro de FrecuenciaCepillado para el paciente
  obtenerPorPaciente: async (patientId) => {
    try {
      const response = await axios.get(`/api/frecuencia-cepillado/paciente/${patientId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error('Error al cargar datos de frecuencia de cepillado');
    }
  },
  // Guarda (actualiza o inserta) el registro
  guardar: async (patientId, data) => {
    try {
      const response = await axios.put(`/api/frecuencia-cepillado/paciente/${patientId}`, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Error al guardar los datos';
      throw new Error(message);
    }
  }
};
