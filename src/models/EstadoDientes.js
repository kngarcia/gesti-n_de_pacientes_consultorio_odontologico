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
      zona_afectada: {
        type: DataTypes.ENUM(
          "mesial",
          "distal",
          "oclusal",
          "lingual",
          "vestibular",
          "general"
        ),
        allowNull: false,
      },
      tipo_afectacion: {
        type: DataTypes.ENUM(
          "Caries",
          "Corona",
          "Corona (Tmp)",
          "Faltante",
          "Fractura",
          "Diastema",
          "Relleno",
          "Rem Prost",
          "A la deriva",
          "Rotación",
          "Fusión",
          "Resto de raíz",
          "Erupción",
          "Transposición",
          "Supernumerario",
          "Pulp",
          "Prótesis",
          "Tornillo",
          "Fixed Ortho",
          "Fixed Prost",
          "Implante",
          "Macrodoncia",
          "Microdoncia",
          "Discrómico",
          "Gastado",
          "Semi Impactado",
          "Intrusión",
          "Edentulismo",
          "Ectópico",
          "Impactado",
          "Rem Orthodo",
          "Extrusión",
          "Post"
        ),
        allowNull: false,
      },
      observacion: {
        type: DataTypes.TEXT,
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
