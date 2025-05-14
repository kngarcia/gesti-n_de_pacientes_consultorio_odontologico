const { models } = require('../models');

module.exports = {
  /**
   * Crear historia clínica usando documento de identidad del paciente
   */
  async crearPorDocumento(req, res) {
    try {
      const { documento } = req.params;
      const datosHistoria = req.body;

      // Buscar paciente por documento
      const paciente = await models.Pacientes.findOne({ 
        where: { documento_identidad: documento }
      });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      // Verificar si ya existe historia clínica
      const existeHistoria = await models.HistoriaClinica.findOne({ 
        where: { id_paciente: paciente.id_paciente } 
      });

      if (existeHistoria) {
        return res.status(400).json({ error: 'El paciente ya tiene historia clínica' });
      }

      // Crear la historia clínica
      const historia = await models.HistoriaClinica.create({
        id_paciente: paciente.id_paciente,
        ...datosHistoria
      });

      res.status(201).json({
        mensaje: 'Historia clínica creada exitosamente',
        historia,
        paciente: {
          nombre: paciente.nombre_completo,
          documento: paciente.documento_identidad
        }
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Obtener historia clínica por documento de identidad del paciente
   */
  async obtenerPorDocumento(req, res) {
    try {
      const { documento } = req.params;

      // Buscar incluyendo la relación con Paciente en una sola consulta
      const historia = await models.HistoriaClinica.findOne({
        include: [{
          model: models.Pacientes,
          as: 'historia_p',
          where: { documento_identidad: documento },
          attributes: ['id_paciente', 'nombre_completo', 'documento_identidad', 'fecha_nacimiento']
        }]
      });

      if (!historia) {
        return res.status(404).json({ error: 'Historia clínica no encontrada' });
      }

      // Formatear respuesta
      const respuesta = {
        id_historia: historia.id_historia,
        fecha_creacion: historia.fecha_creacion,
        observaciones: historia.observaciones_generales,
        paciente: {
          id: historia.historia_p.id_paciente,
          nombre: historia.historia_p.nombre_completo,
          documento: historia.historia_p.documento_identidad,
          fecha_nacimiento: historia.historia_p.fecha_nacimiento
        }
      };

      res.json(respuesta);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Actualizar historia clínica por documento de paciente
   */
  async actualizarPorDocumento(req, res) {
    try {
      const { documento } = req.params;
      const datosActualizacion = req.body;

      // Buscar paciente por documento
      const paciente = await models.Pacientes.findOne({ 
        where: { documento_identidad: documento },
        attributes: ['id_paciente']
      });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      // Actualizar historia clínica
      const [updated] = await models.HistoriaClinica.update(datosActualizacion, {
        where: { id_paciente: paciente.id_paciente }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Historia clínica no encontrada' });
      }

      // Obtener la historia actualizada
      const historiaActualizada = await models.HistoriaClinica.findOne({
        where: { id_paciente: paciente.id_paciente }
      });

      res.json({
        mensaje: 'Historia clínica actualizada exitosamente',
        historia: historiaActualizada
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Eliminar historia clínica por documento de paciente
   */
  async eliminarPorDocumento(req, res) {
    try {
      const { documento } = req.params;

      // Buscar paciente por documento
      const paciente = await models.Pacientes.findOne({ 
        where: { documento_identidad: documento },
        attributes: ['id_paciente']
      });

      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      // Eliminar historia clínica
      const deleted = await models.HistoriaClinica.destroy({
        where: { id_paciente: paciente.id_paciente }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Historia clínica no encontrada' });
      }

      res.json({ mensaje: 'Historia clínica eliminada exitosamente' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};