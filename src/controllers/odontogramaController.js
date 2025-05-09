const { models, sequelize } = require("../models");

const estadosValidos = [
  "Caries",
  "Resinas",
  "Ausente",
  "Corona",
  "Erupción",
  "Sano",
  "Núcleo",
];

// 🔹 Obtener o crear historia clínica del paciente
const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error("Paciente no encontrado");

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente },
  });

  return historia;
};

const obtenerOdontograma = async (req, res) => {
  try {
    const historia = await obtenerHistoria(req.params.idPaciente);

    const examen = await models.ExamenClinico.findOne({
      where: { id_historia: historia.id_historia },
    });

    if (!examen)
      return res.status(404).json({ dientes: [], plan_tratamiento: "" });

    const dientes = await models.EstadoDientes.findAll({
      where: { id_examen_clinico: examen.id_examen_clinico },
      order: [
        ["numero_diente", "ASC"],
        ["id_estado_dientes", "ASC"],
      ],
    });

    // Transformamos cada entrada en el formato esperado
    const datos = dientes.map((d) => ({
      numero: d.numero_diente,
      estado: d.estado,
    }));

    const planTratamiento =
      dientes.length > 0 ? dientes[0].plan_tratamiento || "" : "";

    return res
      .status(200)
      .json({ dientes: datos, plan_tratamiento: planTratamiento });
  } catch (error) {
    console.error("❌ Error obteniendo odontograma:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Guardar o actualizar odontograma completo
const guardarOdontograma = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dientes, plan_tratamiento } = req.body;
    const historia = await obtenerHistoria(req.params.idPaciente);

    const [examen] = await models.ExamenClinico.findOrCreate({
      where: { id_historia: historia.id_historia },
      defaults: { id_historia: historia.id_historia },
      transaction,
    });

    // Borrar registros antiguos
    await models.EstadoDientes.destroy({
      where: { id_examen_clinico: examen.id_examen_clinico },
      transaction,
    });

    // Crear nuevos registros
    const registros = dientes
      .filter((d) => estadosValidos.includes(d.estado))
      .map((d) => ({
        id_examen_clinico: examen.id_examen_clinico,
        numero_diente: d.numero,
        estado: d.estado,
        plan_tratamiento: plan_tratamiento || null, // solo se guarda una vez
      }));

    console.log("🦷 Guardando odontograma:", registros);

    await models.EstadoDientes.bulkCreate(registros, { transaction });

    await transaction.commit();
    res.status(200).json({ mensaje: "Odontograma guardado correctamente" });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error guardando odontograma:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerOdontograma,
  guardarOdontograma,
};