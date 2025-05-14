// src/routes/odontograma.js

const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controllers/odontogramaController");

const router = express.Router();

// ── Odontograma ────────────────────────────────────────────────────────────

// GET   /api/odontograma/paciente/:idPaciente
router.get("/paciente/:idPaciente", controller.obtenerOdontograma);

// POST  /api/odontograma/paciente/:idPaciente
router.post("/paciente/:idPaciente", controller.guardarOdontograma);

// ── Radiografía (mismo paciente) ────────────────────────────────────────────

// POST  /api/odontograma/paciente/:idPaciente/radiografia
//      -> Subir el PDF y guardarlo en EstadoDientes.radiografia
router.post(
  "/paciente/:idPaciente/radiografia",
  upload.single("radiografia"),
  controller.subirRadiografiaPaciente
);

// GET   /api/odontograma/paciente/:idPaciente/radiografia
//      -> Descargar el PDF en el navegador
router.get(
  "/paciente/:idPaciente/radiografia",
  controller.descargarRadiografiaPaciente
);

module.exports = router;
