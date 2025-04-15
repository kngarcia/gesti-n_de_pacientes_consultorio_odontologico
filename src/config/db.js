require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: true, // Desactiva logs de SQL
  }
);

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
