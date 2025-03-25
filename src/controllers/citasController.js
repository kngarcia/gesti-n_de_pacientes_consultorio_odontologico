const { models } = require("../models");

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await models.Citas.findAll({
      include: [
        { model: models.Pacientes, as: 'Paciente' },
        { model: models.Usuarios, as: 'Auxiliar' },
      ],
      raw: true,
      nest: true
    });

    // Devuelve las fechas tal cual están en DB (UTC)
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener citas", error });
  }
};

// Crear una nueva cita
const crearCita = async (req, res) => {
  try {
    const { fecha } = req.body;
    const fechaLocal = new Date(fecha);
    const ahora = new Date();

    // Validación directa (el frontend ya envió la hora local)
    if (fechaLocal < ahora) {
      return res.status(400).json({ 
        mensaje: "No se pueden agendar citas en horas pasadas" 
      });
    }

    // Guarda la fecha tal cual viene del frontend (ya es UTC si el frontend hizo la conversión)
    const nuevaCita = await models.Citas.create({
      ...req.body,
      fecha: fechaLocal.toISOString() // Guarda como ISO string
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear cita", error });
  }
};

// Actualizar una cita
const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha } = req.body;
    
    if (fecha) {
      const fechaLocal = new Date(fecha);
      const ahora = new Date();
      
      if (fechaLocal < ahora) {
        return res.status(400).json({
          mensaje: "No se pueden agendar citas en horas pasadas"
        });
      }
    }

    const cita = await models.Citas.findByPk(id);
    if (!cita) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }
    
    await cita.update({ 
      ...req.body,
      fecha: fecha ? new Date(fecha).toISOString() : cita.fecha
    });

    res.json(cita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar cita", error });
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
    res.status(500).json({ mensaje: "Error al eliminar cita", error });
  }
};

module.exports = {
  obtenerCitas,
  crearCita,
  actualizarCita,
  eliminarCita,
};