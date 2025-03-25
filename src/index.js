require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conectarDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Configuración de CORS y middleware para manejar JSON
app.use(cors());
app.use(express.json());


// 🔹 Conexión a la base de datos MySQL
conectarDB();

// 🔹 Importamos rutas
const pacientesRoutes = require("./routes/pacientes");
const usuarioRoutes = require("./routes/usuarios");
const citasRoutes = require("./routes/citas");
const authRoutes = require("./routes/authRoutes"); // Para autenticación

// 🔹 Usamos las rutas
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/auth", authRoutes); // Endpoint para autenticación


// 🔹  Ruta raíz para verificar que el servidor está funcionando correctamente
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

// 🔹 Middleware para manejar rutas no existentes
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// 🔹 Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});