const { models, sequelize } = require('../models');

// Reutilizamos la obtención/creación de la historia clínica
const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente }
  });

  return historia;
};

// Obtener diagnóstico general de un paciente
const obtenerDiagnostico = async (req, res) => {
  try {
    const { patientId } = req.params;
    const historia = await obtenerHistoria(patientId);

    const diag = await models.DiagnosticoGeneral.findOne({
      where: { id_historia: historia.id_historia }
    });

    // Si no existe, devolvemos null para que el front inicie creación
    if (!diag) return res.status(200).json(null);

    res.status(200).json(diag);
  } catch (error) {
    console.error('Error obteniendo diagnóstico general:', error);
    res.status(500).json({ error: `Error obteniendo diagnóstico: ${error.message}` });
  }
};

// Crear un nuevo diagnóstico general
const crearDiagnostico = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { patientId } = req.params;
    const { descripcion_tejidos_blandos, descripcion_tejidos_duros } = req.body;

    const historia = await obtenerHistoria(patientId);

    const nuevo = await models.DiagnosticoGeneral.create({
      id_historia: historia.id_historia,
      descripcion_tejidos_blandos,
      descripcion_tejidos_duros
    }, { transaction });

    await transaction.commit();
    res.status(201).json(nuevo);
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
    console.error('Error creando diagnóstico general:', error);
    res.status(500).json({ error: `Error creando diagnóstico: ${error.message}` });
  }
};

// Actualizar diagnóstico existente
const actualizarDiagnostico = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { patientId } = req.params;
    const { descripcion_tejidos_blandos, descripcion_tejidos_duros } = req.body;

    const historia = await obtenerHistoria(patientId);

    const diag = await models.DiagnosticoGeneral.findOne({
      where: { id_historia: historia.id_historia }
    });
    if (!diag) throw new Error('No existe un diagnóstico para este paciente');

    await diag.update({ descripcion_tejidos_blandos, descripcion_tejidos_duros }, { transaction });
    await transaction.commit();

    res.status(200).json(diag);
  } catch (error) {
    await transaction.rollback();
    console.error('Error actualizando diagnóstico general:', error);
    res.status(500).json({ error: `Error actualizando diagnóstico: ${error.message}` });
  }
};

module.exports = { obtenerDiagnostico, crearDiagnostico, actualizarDiagnostico };
