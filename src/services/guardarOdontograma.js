import axios from "axios";

const API_URL = "http://localhost:3000/api/odontograma";

export const guardarOdontograma = async (id_paciente, dientes) => {
  try {
    const payload = {
      id_paciente,
      dientes,
    };

    console.log("🧾 Enviando odontograma al backend...");
    console.log("🧍‍♂️ ID Paciente:", id_paciente);
    console.log("🦷 Dientes:", dientes);

    const response = await axios.post(API_URL, payload);

    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("8899 Error al guardar el odontograma:", error);
    console.error("PAILA Error al guardar odontograma:");
    console.error("Este es un mensaje:", error.message);
    console.error("Este es el Stack:", error.stack);
    throw error;
  }
};
