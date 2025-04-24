const { models, sequelize } = require("../models");

// Obtener todas las citas (actualizado)
const obtenerCitas = async (req, res) => {
  try {
    const citas = await models.Citas.findAll({
      include: [
        { 
          model: models.Pacientes, 
          as: 'Paciente',
          required: false // LEFT JOIN para incluir citas sin paciente
        },
        { 
          model: models.Usuarios, 
          as: 'Auxiliar' 
        }
      ],
      raw: true,
      nest: true,
      order: [['fecha', 'DESC']] // Ordenar por fecha descendente
    });

    // Formatear respuesta para incluir tipo de paciente
    const citasFormateadas = citas.map(cita => ({
      ...cita,
      tipo_paciente: cita.id_paciente ? 'registrado' : 'espontaneo',
      paciente: cita.id_paciente 
        ? cita.Paciente 
        : {
            nombre_completo: cita.nombre_espontaneo,
            documento_identidad: cita.documento_espontaneo,
            telefono: cita.telefono_espontaneo
          }
    }));

    res.json(citasFormateadas);
  } catch (error) {
    res.status(500).json({ 
      mensaje: "Error al obtener citas", 
      error: error.message 
    });
  }
};

// Buscar paciente por documento (nueva función)
const buscarPaciente = async (req, res) => {
  try {
    const { documento } = req.query;
    
    if (!documento) {
      return res.status(400).json({ mensaje: "Documento es requerido" });
    }

    const paciente = await models.Pacientes.findOne({
      where: { documento_identidad: documento },
      attributes: ['id_paciente', 'nombre_completo', 'telefono', 'edad', 'eps']
    });

    res.json({
      encontrado: !!paciente,
      paciente: paciente || null
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: "Error al buscar paciente", 
      error: error.message 
    });
  }
};

// Crear una nueva cita (actualizado)
const crearCita = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { 
      id_paciente,
      documento_espontaneo,
      nombre_espontaneo,
      telefono_espontaneo,
      motivo_cita,
      fecha,
      id_auxiliar
    } = req.body;

    const fechaLocal = new Date(fecha);
    const ahora = new Date();

    // Validaciones básicas
    if (fechaLocal < ahora) {
      await transaction.rollback();
      return res.status(400).json({ 
        mensaje: "No se pueden agendar citas en horas pasadas" 
      });
    }

    if (!motivo_cita) {
      await transaction.rollback();
      return res.status(400).json({ 
        mensaje: "El motivo de la cita es requerido" 
      });
    }

    // Validar que tenga paciente registrado o datos espontáneos
    if (!id_paciente && !nombre_espontaneo) {
      await transaction.rollback();
      return res.status(400).json({ 
        mensaje: "Debe proporcionar paciente registrado o datos de paciente espontáneo" 
      });
    }

    // Validar datos mínimos para espontáneos
    if (!id_paciente && !telefono_espontaneo) {
      await transaction.rollback();
      return res.status(400).json({ 
        mensaje: "Teléfono es requerido para pacientes espontáneos" 
      });
    }

    const nuevaCita = await models.Citas.create({
      id_paciente: id_paciente || null,
      id_auxiliar,
      fecha: fechaLocal.toISOString(),
      estado: 'pendiente',
      motivo_cita,
      nombre_espontaneo: nombre_espontaneo || null,
      documento_espontaneo: documento_espontaneo || null,
      telefono_espontaneo: telefono_espontaneo || null
    }, { transaction });

    await transaction.commit();
    res.status(201).json(nuevaCita);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      mensaje: "Error al crear cita", 
      error: error.message 
    });
  }
};

// Actualizar una cita (actualizado)
const actualizarCita = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { 
      fecha,
      motivo_cita,
      estado,
      nombre_espontaneo,
      telefono_espontaneo
    } = req.body;

    const cita = await models.Citas.findByPk(id, { transaction });
    if (!cita) {
      await transaction.rollback();
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }

    // Validar fecha si viene en el body
    if (fecha) {
      const fechaLocal = new Date(fecha);
      const ahora = new Date();
      
      if (fechaLocal < ahora) {
        await transaction.rollback();
        return res.status(400).json({
          mensaje: "No se pueden agendar citas en horas pasadas"
        });
      }
    }

    // Preparar datos a actualizar
    const datosActualizacion = {
      fecha: fecha ? new Date(fecha).toISOString() : cita.fecha,
      motivo_cita: motivo_cita || cita.motivo_cita,
      estado: estado || cita.estado
    };

    // Si es cita espontánea, actualizar también esos campos
    if (!cita.id_paciente) {
      datosActualizacion.nombre_espontaneo = nombre_espontaneo || cita.nombre_espontaneo;
      datosActualizacion.telefono_espontaneo = telefono_espontaneo || cita.telefono_espontaneo;
    }

    await cita.update(datosActualizacion, { transaction });
    await transaction.commit();

    res.json(cita);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      mensaje: "Error al actualizar cita", 
      error: error.message 
    });
  }
};

// Eliminar una cita (sin cambios)
const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await models.Citas.findByPk(id);
    if (!cita) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }
    await cita.destroy();
    res.json({ mensaje: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ 
      mensaje: "Error al eliminar cita", 
      error: error.message 
    });
  }
};

module.exports = {
  buscarPaciente,
  obtenerCitas,
  crearCita,
  actualizarCita,
  eliminarCita
};