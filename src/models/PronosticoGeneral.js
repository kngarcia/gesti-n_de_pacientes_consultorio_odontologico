const Sequelize = require('sequelize');
const { underscoredIf } = require('sequelize/lib/utils');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PronosticoGeneral', {
    id_pronostico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_historia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HistoriaClinica',
        key: 'id_historia'
      }
    },
    diente: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tipo_alteracion: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    pronostico: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'PronosticoGeneral',
    timestamps: true, // Esto maneja automáticamente createdAt y updatedAt
    underscored: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_pronostico" }]
      },
      {
        name: "fk_general_historia",
        using: "BTREE",
        fields: [{ name: "id_historia" }]
      },
      // Solo estos 2 índices clave:
      {
        name: "idx_historia_diente",
        using: "BTREE",
        fields: [{ name: "id_historia" }, { name: "diente" }]
      },
      {
        name: "idx_historia_activo",
        using: "BTREE",
        fields: [{ name: "id_historia" }, { name: "activo" }]
      }
    ]
  });
};