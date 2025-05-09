const express = require("express");
const router = express.Router();
const controller = require("../controllers/odontogramaController");

router.get("/paciente/:idPaciente", controller.obtenerOdontograma);
router.post("/paciente/:idPaciente", controller.guardarOdontograma);

module.exports = router;