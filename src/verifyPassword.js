const bcrypt = require("bcrypt");

const passwordIngresada = "unicornio777"; // Contraseña que envías en el login
const passwordEnBD =
  "$2b$10$PX62t1IKxPq65fyeMZiL/.rBbijFCor1vJOeyqCn.kJdnhw32X3YS"; // Contraseña en la BD

bcrypt.compare(passwordIngresada, passwordEnBD).then((result) => {
  console.log("¿Contraseña válida?", result);
});
