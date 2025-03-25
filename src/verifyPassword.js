const bcrypt = require("bcrypt");

const passwordIngresada = "unicornio777"; // Contraseña que envías en el login
const passwordEnBD = "$2b$10$unUr5DjgsjEGnY1gmkyk4.qhIvFlOO8nOhkh2pP/BMDgVz5nNT5bO"; // Contraseña en la BD

bcrypt.compare(passwordIngresada, passwordEnBD).then(result => {
    console.log("¿Contraseña válida?", result);
});