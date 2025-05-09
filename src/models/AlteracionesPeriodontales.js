const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlteracionesPeriodontales', {
    id_periodontal: {
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
    movilidad: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    placa_blanda: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    placa_calcificada: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    sangrado: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    retraccion_gingival: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      field: 'retraccion_gingibal'
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AlteracionesPeriodontales',
    timestamps: false,
    indexes: [
      {
        name:   "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_periodontal" },
        ]
      },
      {
        name: "fk_periodontal_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
