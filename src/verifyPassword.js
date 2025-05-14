const bcrypt = require("bcrypt");

const passwordIngresada = "unicornio"; // Contraseña que envías en el login
const passwordEnBD =
  "$2b$10$0BorvX50uk9w7KebLF6Bs.yrmJGXX1NsSF2UN/GAQeP/KmwNo.dBW"; // Contraseña en la BD

bcrypt.compare(passwordIngresada, passwordEnBD).then((result) => {
  console.log("¿Contraseña válida?", result);
});
