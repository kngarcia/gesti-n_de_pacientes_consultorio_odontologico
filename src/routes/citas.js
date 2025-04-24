const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citasController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// Buscar paciente por documento (accesible para admin y auxiliar)
router.get(
  "/buscar-paciente",
  verificarToken,
  verificarRol(["admin", "auxiliar"]),
  citaController.buscarPaciente
);

// Obtener todas las citas (accesible para admin y auxiliar)
router.get(
  "/",
  verificarToken,
  verificarRol(["admin", "auxiliar"]),
  citaController.obtenerCitas
);

// Crear nueva cita (accesible para admin y auxiliar)
router.post(
  "/",
  verificarToken,
  verificarRol(["admin", "auxiliar"]),
  citaController.crearCita
);

// Actualizar cita (accesible para admin y auxiliar)
router.put(
  "/:id",
  verificarToken,
  verificarRol(["admin", "auxiliar"]),
  citaController.actualizarCita
);

// Eliminar cita (accesible solo para admin)
router.delete(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  citaController.eliminarCita
);

module.exports = router;