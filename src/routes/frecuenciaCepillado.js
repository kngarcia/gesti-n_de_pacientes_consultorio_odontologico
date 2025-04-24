const express = require('express');
const router = express.Router();
const controller = require('../controllers/frecuenciaCepilladoController');

router.get('/paciente/:patientId', controller.obtenerFrecuenciaCepillado);
router.post('/paciente/:patientId', controller.crearFrecuenciaCepillado);
router.put('/paciente/:patientId', controller.guardarFrecuenciaCepillado);

module.exports = router;
