const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const generarToken = (usuario) => {
    console.log("SecretKey: ", process.env.JWT_SECRET); // Usamos JWT_SECRET
    return jwt.sign({ id: usuario.id_usuario, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const verificarPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = { generarToken, verificarPassword };
