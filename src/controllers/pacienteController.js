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
    const { nombre, apellido, edad, telefono, direccion, correo } = req.body;
    const nuevoPaciente = await models.Pacientes.create({ nombre, apellido, edad, telefono, direccion, correo });
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear paciente", error });
  }
};

// Actualizar un paciente
const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await models.Pacientes.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    await paciente.update(req.body);
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar paciente", error });
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
