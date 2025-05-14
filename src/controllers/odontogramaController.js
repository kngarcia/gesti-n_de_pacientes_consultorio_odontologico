// src/controllers/odontogramaController.js

const { models, sequelize } = require("../models");
const { Op } = require("sequelize");

const estadosValidos = [
  "Caries", "Resinas", "Ausente", "Corona",
  "Erupción", "Sano", "Núcleo",
];

// 🔹 Utility: obtener o crear historia clínica
const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error("Paciente no encontrado");

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente },
  });

  return historia;
};


// 🔹 GET odontograma (ahora con tieneRadiografia)
async function obtenerOdontograma(req, res) {
  try {
    const historia = await obtenerHistoria(req.params.idPaciente);
    const examen = await models.ExamenClinico.findOne({
      where: { id_historia: historia.id_historia },
    });

    if (!examen) {
      return res
        .status(404)
        .json({ dientes: [], plan_tratamiento: "", tieneRadiografia: false });
    }

    // 1) Carga los estados dentales
    const dientes = await models.EstadoDientes.findAll({
      where: { id_examen_clinico: examen.id_examen_clinico },
      order: [
        ["numero_diente", "ASC"],
        ["id_estado_dientes", "ASC"],
      ],
    });

    // 2) Mapea al formato del front
    const datos = dientes.map((d) => ({
      numero: d.numero_diente,
      estado: d.estado,
    }));

    const plan = dientes.length ? dientes[0].plan_tratamiento || "" : "";

    // 3) Comprueba si existe ya un BLOB en 'radiografia'
    const existeBlob = await models.EstadoDientes.findOne({
      where: {
        id_examen_clinico: examen.id_examen_clinico,
        radiografia: { [Op.ne]: null },
      },
      attributes: ["id_estado_dientes"],
    });

    // 4) Devuelve todo junto, incluyendo la bandera
    return res.status(200).json({
      dientes: datos,
      plan_tratamiento: plan,
      tieneRadiografia: !!existeBlob,
    });
  } catch (error) {
    console.error("❌ Error obteniendo odontograma:", error);
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 POST odontograma (solo dientes + plan), preservando radiografía
async function guardarOdontograma(req, res) {
  const t = await sequelize.transaction();
  try {
    const { dientes, plan_tratamiento } = req.body;
    const historia = await obtenerHistoria(req.params.idPaciente);
    const [examen] = await models.ExamenClinico.findOrCreate({
      where: { id_historia: historia.id_historia },
      defaults: { id_historia: historia.id_historia },
      transaction: t,
    });
    const examenId = examen.id_examen_clinico;

    // 0) Recuperar blob anterior (si existe)
    const previo = await models.EstadoDientes.findOne({
      where: {
        id_examen_clinico: examenId,
        radiografia: { [Op.ne]: null },
      },
      transaction: t,
    });
    const blobPrevio = previo?.radiografia || null;

    // 1) Borrar todos los estados
    await models.EstadoDientes.destroy({
      where: { id_examen_clinico: examenId },
      transaction: t,
    });

    // 2) Bulk create nuevos estados (sin radiografía)
    const regs = dientes
      .filter((d) => estadosValidos.includes(d.estado))
      .map((d) => ({
        id_examen_clinico: examenId,
        numero_diente: d.numero,
        estado: d.estado,
        plan_tratamiento: plan_tratamiento || null,
      }));
    await models.EstadoDientes.bulkCreate(regs, { transaction: t });

    // 3) Si había PDF, re-aplicarlo a todos los registros de este examen
    if (blobPrevio) {
      await models.EstadoDientes.update(
        { radiografia: blobPrevio },
        { where: { id_examen_clinico: examenId }, transaction: t }
      );
    }

    await t.commit();
    return res.json({ mensaje: "Odontograma guardado y radiografía preservada." });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error guardando odontograma:", error);
    return res.status(500).json({ error: error.message });
  }
}

// 🔹 POST radiografía usando patientId
async function subirRadiografiaPaciente(req, res) {
  try {
    const { idPaciente } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: "PDF requerido." });
    }

    const historia = await obtenerHistoria(idPaciente);
    const [examen] = await models.ExamenClinico.findOrCreate({
      where: { id_historia: historia.id_historia },
      defaults: { id_historia: historia.id_historia },
    });
    const examenId = examen.id_examen_clinico;

    // Actualizar solo la columna radiografia
    await models.EstadoDientes.update(
      { radiografia: req.file.buffer },
      { where: { id_examen_clinico: examenId } }
    );

    return res.json({ mensaje: "Radiografía subida correctamente." });
  } catch (error) {
    console.error("❌ Error subirRadiografiaPaciente:", error);
    return res.status(500).json({ error: "Error interno." });
  }
}

// 🔹 GET radiografía usando patientId
async function descargarRadiografiaPaciente(req, res) {
  try {
    const { idPaciente } = req.params;
    const historia = await models.HistoriaClinica.findOne({
      where: { id_paciente: idPaciente },
    });
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada." });
    }

    const examen = await models.ExamenClinico.findOne({
      where: { id_historia: historia.id_historia },
    });
    if (!examen) {
      return res.status(404).json({ error: "Examen no encontrado." });
    }

    const estado = await models.EstadoDientes.findOne({
      where: { id_examen_clinico: examen.id_examen_clinico },
      attributes: ["radiografia"],
    });
    if (!estado?.radiografia) {
      return res.status(404).json({ error: "Sin radiografía." });
    }

    res.setHeader("Content-Type", "application/pdf");
    return res.send(estado.radiografia);
  } catch (error) {
    console.error("❌ Error descargarRadiografiaPaciente:", error);
    return res.status(500).json({ error: "Error interno." });
  }
}

module.exports = {
  obtenerOdontograma,
  guardarOdontograma,
  subirRadiografiaPaciente,
  descargarRadiografiaPaciente,
};
