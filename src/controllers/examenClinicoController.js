const { ExamenClinico } = require("../models");

exports.obtenerUltimoExamenClinico = async (req, res) => {
  const { id_paciente } = req.params;

  try {
    const examen = await ExamenClinico.findOne({
      where: { id_paciente },
      order: [["fecha", "DESC"]], // o la columna que corresponda
    });

    if (!examen) {
      return res.status(404).json({ mensaje: "No se encontró examen clínico" });
    }

    res.json({ id_examen_clinico: examen.id_examen_clinico });
  } catch (error) {
    console.error("88 Error obteniendo examen clínico:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};
