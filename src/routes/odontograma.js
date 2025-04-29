const express = require("express");
const router = express.Router();
const { guardarOdontograma } = require("../controllers/odontogramaController");

router.post(
  "/",
  (req, res, next) => {
    console.log("📩 Llamada recibida en /api/odontograma");
    next(); // sigue al controlador real
  },
  guardarOdontograma
);

module.exports = router;
