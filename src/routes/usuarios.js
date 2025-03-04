const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Definir rutas
router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", usuarioController.crearUsuario);
router.put("/:id", usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;
