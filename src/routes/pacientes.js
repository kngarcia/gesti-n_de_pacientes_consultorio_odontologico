const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// Solo un ADMIN puede ver todos los pacientes y acceder al historial
router.get("/", verificarToken, verificarRol("admin"), pacienteController.obtenerPacientes);
router.get("/:id", verificarToken, verificarRol("admin"), pacienteController.obtenerPacientePorId);

// Solo un ADMIN puede registrar o modificar pacientes
router.post("/", verificarToken, verificarRol("admin"), pacienteController.crearPaciente);
router.put("/:id", verificarToken, verificarRol("admin"), pacienteController.actualizarPaciente);
router.delete("/:id", verificarToken, verificarRol("admin"), pacienteController.eliminarPaciente);

module.exports = router;
