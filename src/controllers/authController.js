const { models } = require("../models");
const { generarToken, verificarPassword } = require("../config/auth");

const login = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    // Si prefieres que la petición use "email" y "password", mapeamos a los campos correctos
    const { email, password } = req.body;

    // Buscamos el usuario usando el campo "correo"
    const usuario = await models.Usuarios.findOne({ where: { correo: email } });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", usuario);
    console.log("Contraseña en la BD:", usuario.contrasena); // Se muestra la propiedad "contrasena"

    // Comparamos la contraseña ingresada con la contraseña encriptada almacenada
    const passwordValida = await verificarPassword(
      password,
      usuario.contrasena
    );
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = generarToken(usuario);
    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};

module.exports = { login };
