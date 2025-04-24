// src/controllers/examenClinicoController.js
const { models, sequelize } = require('../models');

const obtenerPacienteYHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: paciente.id_paciente },
    defaults: { id_paciente: paciente.id_paciente }
  });

  return { paciente, historia };
};

const obtenerExamenPorPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const { historia } = await obtenerPacienteYHistoria(idPaciente);

    const examen = await models.ExamenClinico.findOne({
      where: { id_historia: historia.id_historia },
      include: [
        { model: models.ExtraOral, as: 'ExtraOrals' },
        {
          model: models.IntraOral,
          as: 'IntraOrals',
          include: [
            { model: models.Mucosas, as: 'Mucosas' },
            { model: models.Encias, as: 'Encias' },
            { model: models.Textura, as: 'Texturas' },
            { model: models.TejidosDuros, as: 'TejidosDuros' }
          ]
        }
      ]
    });

    if (!examen) return res.status(404).json(null);
    res.status(200).json(examen);
  } catch (error) {
    console.error('Error al obtener examen:', error);
    res.status(500).json({ error: error.message });
  }
};

const guardarExamen = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { idPaciente } = req.params;
    const { extraOral, intraOral } = req.body;
    const { historia } = await obtenerPacienteYHistoria(idPaciente);

    // 1) Upsert ExamenClinico
    const [examen] = await models.ExamenClinico.findOrCreate({
      where: { id_historia: historia.id_historia },
      defaults: { id_historia: historia.id_historia },
      transaction
    });

    // Generador genérico de upsert
    const upsertChild = async (Model, data, foreignKey) => {
      if (!data) return;
      // buscamos existente
      const where = { [foreignKey]: data[foreignKey] || examen.id_examen_clinico };
      const existing = await Model.findOne({ where, transaction });
      if (existing) {
        await existing.update(data, { transaction });
      } else {
        await Model.create(data, { transaction });
      }
    };

    // 2) Upsert ExtraOral usando id_examen_clinico como FK
    await upsertChild(
      models.ExtraOral,
      { ...extraOral, id_examen_clinico: examen.id_examen_clinico },
      'id_examen_clinico'
    );

    // 3) Upsert IntraOral
    let intraOralRecord = await models.IntraOral.findOne({
      where: { id_examen_clinico: examen.id_examen_clinico },
      transaction
    });

    if (intraOralRecord) {
      await intraOralRecord.update(intraOral, { transaction });
    } else {
      intraOralRecord = await models.IntraOral.create(
        { ...intraOral, id_examen_clinico: examen.id_examen_clinico },
        { transaction }
      );
    }

    const idIntraOral = intraOralRecord.id_intra_oral;

    // 4) Upsert de cada hijo de IntraOral usando id_intra_oral como FK
    await upsertChild(
      models.Mucosas,
      { ...intraOral.mucosas, id_intra_oral: idIntraOral },
      'id_intra_oral'
    );
    await upsertChild(
      models.Encias,
      { ...intraOral.encias, id_intra_oral: idIntraOral },
      'id_intra_oral'
    );
    await upsertChild(
      models.Textura,
      { ...intraOral.textura, id_intra_oral: idIntraOral },
      'id_intra_oral'
    );
    await upsertChild(
      models.TejidosDuros,
      { ...intraOral.tejidosDuros, id_intra_oral: idIntraOral },
      'id_intra_oral'
    );

    await transaction.commit();

    // 5) Retornar el examen completo actualizado
    const resultado = await models.ExamenClinico.findOne({
      where: { id_examen_clinico: examen.id_examen_clinico },
      include: [
        { model: models.ExtraOral, as: 'ExtraOrals' },
        {
          model: models.IntraOral,
          as: 'IntraOrals',
          include: [
            { model: models.Mucosas, as: 'Mucosas' },
            { model: models.Encias, as: 'Encias' },
            { model: models.Textura, as: 'Texturas' },
            { model: models.TejidosDuros, as: 'TejidosDuros' }
          ]
        }
      ]
    });

    return res.status(200).json(resultado);
  } catch (error) {
    await transaction.rollback();
    console.error('Error al guardar examen:', error);
    res.status(500).json({
      error: 'Error al guardar examen',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  obtenerExamenPorPaciente,
  guardarExamen
};
