const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaClinicaController');

// Todas las rutas usan documento_identidad como parámetro
router.post('/documento/:documento', historiaClinicaController.crearPorDocumento);
router.get('/documento/:documento', historiaClinicaController.obtenerPorDocumento);
router.put('/documento/:documento', historiaClinicaController.actualizarPorDocumento);
router.delete('/documento/:documento', historiaClinicaController.eliminarPorDocumento);

module.exports = router;