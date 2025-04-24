import axios from 'axios';

const API_URL = 'http://localhost:3000/api/antecedentes';

const getAntecedentesByPacienteId = async (pacienteId) => {
  try {
    const response = await axios.get(`${API_URL}/${pacienteId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // No se encontraron antecedentes
      return null;
    }
    console.error('Error al obtener antecedentes:', error);
    throw error;
  }
};

const saveAntecedentes = async (pacienteId, antecedentesData) => {
  try {
    // Verificar si ya existen antecedentes
    const existenAntecedentes = await getAntecedentesByPacienteId(pacienteId) !== null;
    
    // Preparar payload completo con valores por defecto
    const payload = {
      antecedentesFamiliares: antecedentesData.antecedentesFamiliares || {},
      antecedentesPatologicos: antecedentesData.antecedentesPatologicos || {},
      antecedentesToxixologicos: antecedentesData.antecedentesToxixologicos || {},
      antecedentesGinecoobtetricos: antecedentesData.antecedentesGinecoobtetricos || {},
      antecedentesEstomatologicos: antecedentesData.antecedentesEstomatologicos || {},
      antecedentesHospitalarios: antecedentesData.antecedentesHospitalarios || {},
      antecedentesOdontologicos: antecedentesData.antecedentesOdontologicos || {}
    };

    console.log('Enviando datos al backend:', payload);
    
    // Usar PUT si ya existen antecedentes, POST si no
    const response = existenAntecedentes 
      ? await axios.put(`${API_URL}/${pacienteId}`, payload, {
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      : await axios.post(`${API_URL}/${pacienteId}`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
    
    return response.data;
  } catch (error) {
    console.error('Detalle del error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

export default {
  getAntecedentesByPacienteId,
  saveAntecedentes
};