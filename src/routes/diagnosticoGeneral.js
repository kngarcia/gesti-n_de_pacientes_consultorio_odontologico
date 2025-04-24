const express = require('express');
const router = express.Router();
const diagnosticoCtrl = require('../controllers/diagnosticoGeneralController');

// GET   /api/diagnostico-general/paciente/:patientId
router.get('/paciente/:patientId', diagnosticoCtrl.obtenerDiagnostico);

// POST  /api/diagnostico-general/paciente/:patientId
router.post('/paciente/:patientId', diagnosticoCtrl.crearDiagnostico);

// PUT   /api/diagnostico-general/paciente/:patientId
router.put('/paciente/:patientId', diagnosticoCtrl.actualizarDiagnostico);

module.exports = router;
