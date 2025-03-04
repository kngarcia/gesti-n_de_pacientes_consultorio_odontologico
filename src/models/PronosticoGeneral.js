const Sequelize = require('sequelize');
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
    descripcion_pronostico_general: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'descrición_pronostico_especifico': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PronosticoGeneral',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pronostico" },
        ]
      },
      {
        name: "fk_general_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
