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

const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    // Depura: muestra lo que tiene req.usuario
    console.log("Rol del usuario:", req.usuario ? req.usuario.rol : "No definido");
    
    if (!req.usuario || req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ mensaje: "No tienes permiso para acceder a esat ruta" });
    }
    next();
  };
};

module.exports = { verificarToken, verificarRol };
