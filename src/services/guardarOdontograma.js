import axios from "axios";

const API_URL = "http://localhost:3000/odontograma"; // cambia si usas otro puerto/backend remoto

export const guardarOdontograma = async (id_examen_clinico, dientes) => {
  try {
    const response = await axios.post(API_URL, {
      id_examen_clinico,
      dientes,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al guardar el odontograma:", error);
    throw error;
  }
};
