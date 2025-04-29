const express = require("express");
const router = express.Router();
const {
  obtenerUltimoExamenClinico,
} = require("../controllers/examenClinicoController");

router.get("/ultimo/:id_paciente", obtenerUltimoExamenClinico);

module.exports = router;
