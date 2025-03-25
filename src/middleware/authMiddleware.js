// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }
  
  const token = authHeader.split(" ")[1]; // Se espera el formato "Bearer <token>"
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "Token inválido" });
    }
    req.usuario = decoded;
    console.log("Decoded token en middleware:", req.usuario); // Agrega este log para depurar
    next();
  });
};

const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    // Depura: muestra lo que tiene req.usuario
    console.log("Rol del usuario:", req.usuario ? req.usuario.rol : "No definido");

    // Si rolesPermitidos es un array, verifica si el rol del usuario está en el array
    if (Array.isArray(rolesPermitidos)) {
      if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
        return res.status(403).json({ mensaje: "No tienes permiso para acceder a esta ruta" });
      }
    }
    // Si rolesPermitidos es un string, verifica si el rol del usuario coincide
    else if (!req.usuario || req.usuario.rol !== rolesPermitidos) {
      return res.status(403).json({ mensaje: "No tienes permiso para acceder a esta ruta" });
    }

    next(); // Si el rol es válido, continúa con la siguiente función
  };
};

module.exports = { verificarToken, verificarRol };
