const bcrypt = require("bcrypt");

const passwordIngresada = "123456"; // Contraseña que envías en el login
const passwordEnBD = "$2b$10$jXktO/kLHQMCQqIyayXbPuQ4dCjfqp/H3BBJqTi45k4Qm8bZPcjLu"; // Contraseña en la BD

bcrypt.compare(passwordIngresada, passwordEnBD).then(result => {
    console.log("¿Contraseña válida?", result);
});