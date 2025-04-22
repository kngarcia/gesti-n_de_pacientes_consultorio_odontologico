const { EstadoDientes } = require("../models");

exports.guardarOdontograma = async (req, res) => {
  try {
    const { id_examen_clinico, dientes } = req.body;

    if (!id_examen_clinico || !Array.isArray(dientes)) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const registros = dientes.map((d) => ({
      id_examen_clinico,
      numero_diente: d.numero,
      zona_afectada: d.zona,
      tipo_afectacion: d.afectacion,
      observacion: d.observacion || null,
    }));

    await EstadoDientes.bulkCreate(registros);

    res.status(201).json({ mensaje: "Odontograma guardado con éxito" });
  } catch (error) {
    console.error("❌ Error al guardar odontograma:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
