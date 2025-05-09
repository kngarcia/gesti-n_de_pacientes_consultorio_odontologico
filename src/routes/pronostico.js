// routes/pronosticoRoutes.js
const express = require('express');
const router = express.Router();
const pronosticoController = require('../controllers/pronosticoController');

router.get('/pronosticos/:patientId', pronosticoController.obtenerTodo);
router.post('/pronosticos/:patientId', pronosticoController.crear);
router.put('/pronosticos/:patientId', pronosticoController.actualizar);

module.exports = router;