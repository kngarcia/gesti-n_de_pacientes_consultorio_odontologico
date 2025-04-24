const express = require('express');
const router = express.Router();
const controller = require('../controllers/examenEstomatologicoController');

router.get('/paciente/:idPaciente', controller.obtenerExamen);
router.post('/paciente/:idPaciente', controller.crearExamen);
router.put('/paciente/:idPaciente', controller.actualizarExamen);

module.exports = router;