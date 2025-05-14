import axios from "axios";

const API_URL = "http://localhost:3000/api/odontograma";

export const odontogramaService = {
  crearOdontograma: (patientId, data) =>
    axios.post(`${API_URL}/paciente/${patientId}`, data),

  obtenerOdontograma: (patientId) =>
    axios.get(`${API_URL}/paciente/${patientId}`),
};
// odontogramaService.js
export async function crearOdontograma(patientId, payload) {
  const res = await axios.post(
    `http://localhost:3000/api/odontograma/paciente/${patientId}`,
    payload
  );
  // Ahora el back responde { mensaje, idExamenClinico }
  return res.data; 
}


export default odontogramaService;
