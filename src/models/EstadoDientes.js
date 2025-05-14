const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "EstadoDientes",
    {
      id_estado_dientes: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_examen_clinico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ExamenClinico",
          key: "id_examen_clinico",
        },
      },
      numero_diente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM(
          "Caries",
          "Resinas",
          "Ausente",
          "Corona",
          "Erupción",
          "Sano",
          "Núcleo"
        ),
        allowNull: false,
      },
      zona: {
        type: DataTypes.ENUM(
          "superior",
          "inferior",
          "izquierda",
          "derecha",
          "centro"
        ),
        allowNull: false,
      },
      plan_tratamiento: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      radiografia: {
        type: DataTypes.BLOB("medium"),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "EstadoDientes",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_estado_dientes" }],
        },
        {
          name: "fk_EstadoDientes_ExamenClinico1_idx",
          using: "BTREE",
          fields: [{ name: "id_examen_clinico" }],
        },
      ],
    }
  );
};
