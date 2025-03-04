const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false, // Desactiva logs de SQL
});

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL exitosa.");
  } catch (error) {
    console.error("❌ Error de conexión a MySQL:", error);
    process.exit(1); // Termina el proceso si falla la conexión
  }
};

module.exports = { sequelize, conectarDB };