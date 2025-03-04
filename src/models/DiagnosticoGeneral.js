const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DiagnosticoGeneral', {
    id_diagnostico: {
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
    descripcion_tejidos_blandos: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descripcion_tejidos_duros: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DiagnosticoGeneral',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_diagnostico" },
        ]
      },
      {
        name: "fk_diag_general_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
