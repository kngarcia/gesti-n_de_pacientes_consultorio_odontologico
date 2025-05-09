const { models, sequelize } = require('../models');

// Helper: obtener o crear la historia clínica
const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error('Paciente no encontrado');
  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente }
  });
  return historia;
};

const pronosticoController = {
  obtenerTodo: async (req, res) => {
    try {
      const { patientId } = req.params;
      const historia = await obtenerHistoria(patientId);

      // Traigo los tres conjuntos
      const [pulpares, periodontales, rawPronosticos] = await Promise.all([
        models.AlteracionesPulpares.findOne({ where: { id_historia: historia.id_historia } }),
        models.AlteracionesPeriodontales.findOne({ where: { id_historia: historia.id_historia } }),
        models.PronosticoGeneral.findAll({
          where: { id_historia: historia.id_historia, activo: true },
          order: [['createdAt', 'DESC']]
        })
      ]);

      console.log('👉 rawPronosticos (instancias):', rawPronosticos);

      // Normalizar pronósticos para front (toJSON ya incluye createdAt/updatedAt)
      const pronosticos = rawPronosticos.map((p, idx) => {
        const js = p.toJSON();
        console.log(`    📦 pronóstico[${idx}] toJSON:`, js);
        return js;
      });

      console.log('✔️ pronosticos normalizados:', pronosticos);

      res.json({
        pulpares:      pulpares      ? pulpares.toJSON()      : {},
        periodontales: periodontales ? periodontales.toJSON() : {},
        pronosticos
      });
    } catch (error) {
      console.error('Error obteniendo pronósticos:', error);
      res.status(500).json({ message: 'Error obteniendo pronósticos' });
    }
  },

  crear: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { patientId } = req.params;
      const historia = await obtenerHistoria(patientId);
      const { pulpares, periodontales, pronosticos } = req.body;

      console.log('📥 crear payload pulpares:', pulpares);
      console.log('📥 crear payload periodontales:', periodontales);
      console.log('📥 crear payload pronosticos:', pronosticos);

      // Crear alteraciones
      await Promise.all([
        models.AlteracionesPulpares.create({ ...pulpares, id_historia: historia.id_historia }, { transaction }),
        models.AlteracionesPeriodontales.create({ ...periodontales, id_historia: historia.id_historia }, { transaction })
      ]);

      // Crear pronósticos específicos
      const pg = pronosticos.map((p, idx) => {
        const obj = {
          diente: p.diente,
          ubicacion: p.ubicacion,
          tipo_alteracion: p.tipo_alteracion,
          pronostico: p.pronostico,
          id_historia: historia.id_historia,
          activo: true
        };
        console.log(`    📤 creando pronóstico[${idx}]:`, obj);
        return obj;
      });
      await models.PronosticoGeneral.bulkCreate(pg, { transaction });

      await transaction.commit();
      res.status(201).json({ message: 'Datos guardados exitosamente' });
    } catch (error) {
      await transaction.rollback();
      console.error('Error al crear pronóstico:', error);
      res.status(400).json({ message: error.message });
    }
  },

  actualizar: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { patientId } = req.params;
      const historia = await obtenerHistoria(patientId);
      const { pulpares, periodontales, pronosticos } = req.body;

      console.log('🔄 actualizar payload pulpares:', pulpares);
      console.log('🔄 actualizar payload periodontales:', periodontales);
      console.log('🔄 actualizar payload pronosticos:', pronosticos);

      // Actualizar alteraciones
      await Promise.all([
        models.AlteracionesPulpares.update(pulpares, {
          where: { id_historia: historia.id_historia },
          transaction
        }),
        models.AlteracionesPeriodontales.update(periodontales, {
          where: { id_historia: historia.id_historia },
          transaction
        })
      ]);

      // Inactivar pronósticos anteriores
      await models.PronosticoGeneral.update(
        { activo: false },
        { where: { id_historia: historia.id_historia }, transaction }
      );

      // Crear nuevos pronósticos sin id_pronostico
      const nuevos = pronosticos.map((p, idx) => {
        const obj = {
          diente: p.diente,
          ubicacion: p.ubicacion,
          tipo_alteracion: p.tipo_alteracion,
          pronostico: p.pronostico,
          id_historia: historia.id_historia,
          activo: true
        };
        console.log(`    📤 re-creando pronóstico[${idx}]:`, obj);
        return obj;
      });
      await models.PronosticoGeneral.bulkCreate(nuevos, { transaction });

      await transaction.commit();
      res.json({ message: 'Datos actualizados exitosamente' });
    } catch (error) {
      await transaction.rollback();
      console.error('Error actualizando pronóstico:', error);
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = pronosticoController;
