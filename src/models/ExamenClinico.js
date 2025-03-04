const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ExamenClinico', {
    id_examen_clinico: {
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
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ExamenClinico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_examen_clinico" },
        ]
      },
      {
        name: "fk_examencli_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
