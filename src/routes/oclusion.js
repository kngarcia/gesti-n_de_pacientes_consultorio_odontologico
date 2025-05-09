const express = require('express');
const router = express.Router();
const controllerOclusion = require('../controllers/oclusionController');

router.get('/paciente/:idPaciente', controllerOclusion.obtenerAnalisis);
router.post('/paciente/:idPaciente', controllerOclusion.crearAnalisis);
router.put('/paciente/:idPaciente', controllerOclusion.actualizarAnalisis);

module.exports = router;