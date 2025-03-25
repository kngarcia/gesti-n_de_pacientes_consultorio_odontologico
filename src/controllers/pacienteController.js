const { models } = require("../models"); // Importa todos los modelos

// Obtener todos los pacientes
const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await models.Pacientes.findAll();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pacientes", error });
  }
};

// Obtener un paciente por ID
const obtenerPacientePorId = async (req, res) => {
  try {
    const paciente = await models.Pacientes.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener paciente", error });
  }
};

// Crear un paciente
const crearPaciente = async (req, res) => {
  try {
    const {
      id_doctora, nombre_completo, documento_identidad, edad, telefono, direccion, 
      fecha_nacimiento, genero, estado_civil, eps, cotizante, beneficiario, 
      origen_enfermedad, motivo_consulta
    } = req.body;

    const nuevoPaciente = await models.Pacientes.create({
      id_doctora, nombre_completo, documento_identidad, edad, telefono, direccion, 
      fecha_nacimiento, genero, estado_civil, eps, cotizante, beneficiario, 
      origen_enfermedad, motivo_consulta
    });

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear paciente", error });
  }
};

const actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_completo,
      documento_identidad,
      edad,
      telefono,
      direccion,
      fecha_nacimiento,
      genero,
      estado_civil,
      eps,
      cotizante,
      beneficiario,
      origen_enfermedad,
      motivo_consulta
    } = req.body;

    // Validaciones básicas
    if (!nombre_completo || !documento_identidad || !edad || !telefono || !eps || !origen_enfermedad) {
      return res.status(400).json({ 
        mensaje: "Faltan campos obligatorios",
        camposRequeridos: [
          'nombre_completo',
          'documento_identidad',
          'edad',
          'telefono',
          'eps',
          'origen_enfermedad'
        ]
      });
    }

    // Verificar que el paciente existe
    const paciente = await models.Pacientes.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }

    // Preparar datos para actualización
    const datosActualizacion = {
      nombre_completo,
      documento_identidad,
      edad: parseInt(edad),
      telefono,
      direccion: direccion || null,
      fecha_nacimiento: fecha_nacimiento || null,
      genero: genero || null,
      estado_civil: estado_civil || null,
      eps,
      cotizante: cotizante || 'No',
      beneficiario: beneficiario || 'No',
      origen_enfermedad,
      motivo_consulta: motivo_consulta || null
    };

    // Actualizar el paciente
    await paciente.update(datosActualizacion);
    
    // Obtener el paciente actualizado para devolverlo
    const pacienteActualizado = await models.Pacientes.findByPk(id);
    
    res.json(pacienteActualizado);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ 
      mensaje: "Error al actualizar paciente",
      error: error.message 
    });
  }
};


// Eliminar un paciente
const eliminarPaciente = async (req, res) => {
  try {
    const paciente = await models.Pacientes.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    await paciente.destroy();
    res.json({ mensaje: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar paciente", error });
  }
};

module.exports = {
  obtenerPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
