const express = require("express");
const router = express.Router();
const { guardarOdontograma } = require("../controllers/odontogramaController");

router.post("/", guardarOdontograma);

module.exports = router;
