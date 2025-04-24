const { models, sequelize } = require('../models');

const obtenerPacienteYHistoria = async (id) => {
  const paciente = await models.Pacientes.findByPk(id);
  if (!paciente) throw new Error('Paciente no encontrado');

  const historia = await models.HistoriaClinica.findOne({
    where: { id_paciente: paciente.id_paciente }
  });
  if (!historia) throw new Error('Historia clínica no encontrada');

  return { paciente, historia };
};

// GET: Obtener antecedentes por ID de paciente
const obtenerAntecedentesPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { historia } = await obtenerPacienteYHistoria(id);

    const antecedentes = await models.Antecedentes.findOne({
      where: { id_historia: historia.id_historia },
      include: [
        { model: models.AntecedentesFamiliares, as: 'AntecedentesFamiliares' },
        { model: models.AntecedentesPatologicos, as: 'AntecedentesPatologicos' },
        { model: models.AntecedentesToxixologicos, as: 'AntecedentesToxixologicos' },
        { model: models.AntecedentesHospitalarios, as: 'AntecedentesHospitalarios' },
        { model: models.AntecedentesGinecoobtetricos, as: 'AntecedentesGinecoobtetricos' },
        { model: models.AntecedentesEstomatologicos, as: 'AntecedentesEstomatologicos' },
        { model: models.AntecedentesOdontologicos, as: 'AntecedentesOdontologicos' }
      ]
    });

    if (!antecedentes) return res.status(404).json(null);
    res.status(200).json(antecedentes);
  } catch (error) {
    console.error('Error al obtener antecedentes:', error);
    res.status(500).json({ error: error.message });
  }
};

const guardarAntecedentes = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { 
      antecedentesFamiliares = {},
      antecedentesPatologicos = {},
      antecedentesToxixologicos = {},
      antecedentesHospitalarios = {},
      antecedentesGinecoobtetricos = {},
      antecedentesEstomatologicos = {},
      antecedentesOdontologicos = {}
    } = req.body;

    // Obtener historia clínica
    const { historia } = await obtenerPacienteYHistoria(id);

    // Buscar o crear el registro principal de antecedentes
    const [antecedentes, created] = await models.Antecedentes.findOrCreate({
      where: { id_historia: historia.id_historia },
      defaults: { id_historia: historia.id_historia },
      transaction
    });

    // Obtener todas las asociaciones existentes
    const antecedentesConAsociaciones = await models.Antecedentes.findOne({
      where: { id_antecedente: antecedentes.id_antecedente },
      include: [
        { model: models.AntecedentesFamiliares, as: 'AntecedentesFamiliares' },
        { model: models.AntecedentesPatologicos, as: 'AntecedentesPatologicos' },
        { model: models.AntecedentesToxixologicos, as: 'AntecedentesToxixologicos' },
        { model: models.AntecedentesHospitalarios, as: 'AntecedentesHospitalarios' },
        { model: models.AntecedentesGinecoobtetricos, as: 'AntecedentesGinecoobtetricos' },
        { model: models.AntecedentesEstomatologicos, as: 'AntecedentesEstomatologicos' },
        { model: models.AntecedentesOdontologicos, as: 'AntecedentesOdontologicos' }
      ],
      transaction
    });

    // Función helper para actualizar o crear asociaciones
    const updateOrCreateAssociation = async (model, data, associationName) => {
      const existingRecord = antecedentesConAsociaciones[associationName];
      const primaryKey = model.primaryKeyAttribute;

      if (existingRecord && existingRecord[primaryKey]) {
        // Actualizar registro existente
        await model.update(data, {
          where: { [primaryKey]: existingRecord[primaryKey] },
          transaction
        });
      } else {
        // Crear nuevo registro
        await model.create({
          ...data,
          id_antecedente: antecedentes.id_antecedente
        }, { transaction });
      }
    };

    // Ejecutar todas las operaciones de actualización/creación
    await Promise.all([
      updateOrCreateAssociation(models.AntecedentesFamiliares, antecedentesFamiliares, 'AntecedentesFamiliares'),
      updateOrCreateAssociation(models.AntecedentesPatologicos, antecedentesPatologicos, 'AntecedentesPatologicos'),
      updateOrCreateAssociation(models.AntecedentesToxixologicos, antecedentesToxixologicos, 'AntecedentesToxixologicos'),
      updateOrCreateAssociation(models.AntecedentesHospitalarios, antecedentesHospitalarios, 'AntecedentesHospitalarios'),
      updateOrCreateAssociation(models.AntecedentesGinecoobtetricos, antecedentesGinecoobtetricos, 'AntecedentesGinecoobtetricos'),
      updateOrCreateAssociation(models.AntecedentesEstomatologicos, antecedentesEstomatologicos, 'AntecedentesEstomatologicos'),
      updateOrCreateAssociation(models.AntecedentesOdontologicos, antecedentesOdontologicos, 'AntecedentesOdontologicos')
    ]);

    await transaction.commit();

    // Obtener el resultado final actualizado
    const resultado = await models.Antecedentes.findOne({
      where: { id_antecedente: antecedentes.id_antecedente },
      include: [
        { model: models.AntecedentesFamiliares, as: 'AntecedentesFamiliares' },
        { model: models.AntecedentesPatologicos, as: 'AntecedentesPatologicos' },
        { model: models.AntecedentesToxixologicos, as: 'AntecedentesToxixologicos' },
        { model: models.AntecedentesHospitalarios, as: 'AntecedentesHospitalarios' },
        { model: models.AntecedentesGinecoobtetricos, as: 'AntecedentesGinecoobtetricos' },
        { model: models.AntecedentesEstomatologicos, as: 'AntecedentesEstomatologicos' },
        { model: models.AntecedentesOdontologicos, as: 'AntecedentesOdontologicos' }
      ]
    });

    res.status(200).json(resultado);
    
  } catch (error) {
    await transaction.rollback();
    console.error('Error al guardar antecedentes:', error);
    res.status(500).json({
      error: 'Error al guardar antecedentes',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  obtenerAntecedentesPorId,
  guardarAntecedentes
};