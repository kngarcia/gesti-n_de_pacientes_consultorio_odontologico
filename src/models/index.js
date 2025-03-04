const { sequelize } = require("../config/db");
const initModels = require("./init-models"); // Importar init-models.js

const models = initModels(sequelize); // Inicializar todos los modelos

const sincronizarDB = async () => {
  try {
    await sequelize.sync({ force: false }); // ⚠️ No usar `force: true` en producción
    console.log("✅ Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
};

sincronizarDB();

module.exports = { sequelize, models };
