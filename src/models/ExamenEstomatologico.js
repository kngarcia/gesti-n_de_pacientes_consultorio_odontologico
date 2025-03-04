const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ExamenEstomatologico', {
    id_examen_estoma: {
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
    musculos_masticadores: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    sintomatico: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true,
      defaultValue: "No"
    },
    asintomatico: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'ExamenEstomatologico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
      {
        name: "fk_estomatologico_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
