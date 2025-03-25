const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citasController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// Solo un ADMIN o AUXILIAR puede ver todas las citas
router.get("/", verificarToken, verificarRol(["admin", "auxiliar"]), citaController.obtenerCitas);

// Solo un ADMIN o AUXILIAR puede crear una nueva cita
router.post("/", verificarToken, verificarRol(["admin", "auxiliar"]), citaController.crearCita);

// Solo un ADMIN o AUXILIAR puede actualizar una cita
router.put("/:id", verificarToken, verificarRol(["admin", "auxiliar"]), citaController.actualizarCita);

// Solo un ADMIN puede eliminar una cita
router.delete("/:id", verificarToken, verificarRol("admin"), citaController.eliminarCita);

module.exports = router;