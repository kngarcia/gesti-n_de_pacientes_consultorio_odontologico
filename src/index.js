require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { conectarDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Configuración de CORS y middleware para manejar JSON
app.use(cors());
app.use(express.json());

// 🔹 Conexión a la base de datos MySQL
conectarDB();

// 🔹 Servir frontend estático
// Ajusta la ruta según tu estructura de carpetas
const distPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(distPath));


// 🔹 Redirigir todas las rutas que no empiecen con /api al index.html del frontend
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// 🔹 Importamos rutas API
const pacientesRoutes = require("./routes/pacientes");
const usuarioRoutes = require("./routes/usuarios");
const citasRoutes = require("./routes/citas");
const authRoutes = require("./routes/authRoutes");
const historiaRoutes = require("./routes/historia");
const antecedentesRoutes = require("./routes/antecedentes");
const frecuenciaCepilladoRoutes = require("./routes/frecuenciaCepillado");
const examenClinicoRoutes = require("./routes/examenClinico");
const odontogramaRoutes = require("./routes/odontograma");
const examenEstomatologicoRoutes = require("./routes/examenEstomatologico");
const diagnosticoGeneralRoutes = require("./routes/diagnosticoGeneral");
const pronosticoRoutes = require("./routes/pronostico");
const oclusionRoutes = require("./routes/oclusion");

// 🔹 Usamos las rutas API
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/historia-clinica", historiaRoutes);
app.use("/api/antecedentes", antecedentesRoutes);
app.use("/api/frecuencia-cepillado", frecuenciaCepilladoRoutes);
app.use("/api/examen-clinico", examenClinicoRoutes);
app.use("/api/odontograma", odontogramaRoutes);
app.use("/api/examen-estomatologico", examenEstomatologicoRoutes);
app.use("/api/diagnostico-general", diagnosticoGeneralRoutes);
app.use("/api/pronostico", pronosticoRoutes);
app.use("/api/oclusion", oclusionRoutes);

// 🔹 Ruta raíz para verificar que el servidor está funcionando
app.get("/api", (req, res) => {
  res.send("¡Servidor funcionando y sirviendo frontend!");
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

