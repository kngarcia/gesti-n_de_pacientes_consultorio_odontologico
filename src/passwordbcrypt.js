const bcrypt = require("bcrypt");

async function encriptarContraseña() {
    const password = "unicornio777"; // La contraseña original
    const hashedPassword = await bcrypt.hash(password, 10); // Genera una versión encriptada
    console.log(hashedPassword);
}

encriptarContraseña();
