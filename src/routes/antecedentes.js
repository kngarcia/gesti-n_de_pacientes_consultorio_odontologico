const express = require('express');
const router = express.Router();
const antecedentesController = require('../controllers/antecedentesController');

// Obtener antecedentes por ID de paciente
router.get('/:id', antecedentesController.obtenerAntecedentesPorId);

// Crear/Actualizar antecedentes
router.put('/:id', antecedentesController.guardarAntecedentes);
router.post('/:id', antecedentesController.guardarAntecedentes);

module.exports = router;