require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

conectarDB();

// 🔹 Importamos y usamos las rutas de pacientes
const pacientesRoutes = require("./routes/pacientes");
app.use("/api/pacientes", pacientesRoutes);

const usuarioRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
