const { models, sequelize } = require('../models');

const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente }
  });

  return historia;
};

const crearAnalisis = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // 1. Obtener historia clínica
    const historia = await obtenerHistoria(req.params.idPaciente);
    
    // 2. Crear análisis principal
    const analisis = await models.AnalisisOclusionATM.create({
      id_historia: historia.id_historia,
      observaciones: req.body.observaciones
    }, { transaction });

    // 3. Crear subsecciones relacionadas
    await Promise.all([
      models.PlanoFrontal.create({
        id_oclusion: analisis.id_oclusion,
        ...req.body.PlanoFrontal
      }, { transaction }),
      
      models.PlanoHorizontal.create({
        id_oclusion: analisis.id_oclusion,
        ...req.body.PlanoHorizontal
      }, { transaction }),
      
      models.AnomaliasATM.create({
        id_oclusion: analisis.id_oclusion,
        ...req.body.AnomaliasATM
      }, { transaction })
    ]);

    await transaction.commit();
    
    // 4. Obtener el análisis completo para respuesta
    const resultado = await models.AnalisisOclusionATM.findByPk(analisis.id_oclusion, {
      include: [
        { model: models.PlanoFrontal, as: 'PlanoFrontals' },
        { model: models.PlanoHorizontal, as: 'PlanoHorizontals' },
        { model: models.AnomaliasATM, as: 'AnomaliasATMs' }
      ]
    });
    
    res.status(201).json(resultado);
    
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      error: `Error creando análisis: ${error.message}`
    });
  }
};

const actualizarAnalisis = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // 1. Obtener historia clínica
    const historia = await obtenerHistoria(req.params.idPaciente);
    
    // 2. Buscar análisis existente
    const analisis = await models.AnalisisOclusionATM.findOne({
      where: { id_historia: historia.id_historia }
    });
    
    if (!analisis) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Análisis no encontrado' });
    }

    // 3. Actualizar datos principales
    await analisis.update({
      observaciones: req.body.observaciones
    }, { transaction });

    // 4. Actualizar subsecciones
    await Promise.all([
      models.PlanoFrontal.update(req.body.PlanoFrontal, { 
        where: { id_oclusion: analisis.id_oclusion },
        transaction 
      }),
      models.PlanoHorizontal.update(req.body.PlanoHorizontal, { 
        where: { id_oclusion: analisis.id_oclusion },
        transaction 
      }),
      models.AnomaliasATM.update(req.body.AnomaliasATM, { 
        where: { id_oclusion: analisis.id_oclusion },
        transaction 
      })
    ]);

    await transaction.commit();
    
    // 5. Obtener análisis actualizado
    const resultado = await models.AnalisisOclusionATM.findByPk(analisis.id_oclusion, {
      include: [
        { model: models.PlanoFrontal, as: 'PlanoFrontals' },
        { model: models.PlanoHorizontal, as: 'PlanoHorizontals' },
        { model: models.AnomaliasATM, as: 'AnomaliasATMs' }
      ]
    });
    
    res.status(200).json(resultado);
    
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      error: `Error actualizando análisis: ${error.message}`
    });
  }
};

const obtenerAnalisis = async (req, res) => {
  try {
    const historia = await obtenerHistoria(req.params.idPaciente);

    const analisis = await models.AnalisisOclusionATM.findOne({
      where: { id_historia: historia.id_historia },
      include: [
        { model: models.PlanoFrontal, as: 'PlanoFrontals' },
        { model: models.PlanoHorizontal, as: 'PlanoHorizontals' },
        { model: models.AnomaliasATM, as: 'AnomaliasATMs' }
      ]
    });

    if (!analisis) return res.status(404).json(null);

    res.status(200).json(analisis);
  } catch (error) {
    res.status(500).json({ 
      error: `Error obteniendo análisis: ${error.message}`
    });
  }
};

module.exports = {
  crearAnalisis,
  actualizarAnalisis,
  obtenerAnalisis
};