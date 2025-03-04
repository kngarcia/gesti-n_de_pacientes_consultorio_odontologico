const { models } = require("../models"); // Importamos el modelo de Usuario

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await models.Usuarios.findAll(); // Obtener todos los usuarios de la BD
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await models.Usuarios.findByPk(req.params.id); // Buscar por ID
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario", error });
  }
};

// Crear un usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const nuevoUsuario = await models.Usuarios.create({ nombre, correo, contraseña, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear usuario", error });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await models.Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar usuario", error });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario", error });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
