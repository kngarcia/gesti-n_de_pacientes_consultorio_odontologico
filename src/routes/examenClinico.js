// routes/examenClinicoRoutes.js
const express = require('express');
const { obtenerExamenPorPaciente, guardarExamen } = require('../controllers/examenClinicoController');

const router = express.Router();

router.get('/paciente/:idPaciente', obtenerExamenPorPaciente);
router.post('/paciente/:idPaciente', guardarExamen);

module.exports = router;