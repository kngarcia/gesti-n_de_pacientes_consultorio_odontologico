const bcrypt = require("bcrypt");

const passwordIngresada = "Jvaldes_2303"; // Contraseña que envías en el login
const passwordEnBD =
  "$2b$10$ptcNRfKhcb6W7ej3nLx9Dut04kcHi7AkDjyhhOvYxnOKE0Gw92ktm"; // Contraseña en la BD

bcrypt.compare(passwordIngresada, passwordEnBD).then((result) => {
  console.log("¿Contraseña válida?", result);
});
