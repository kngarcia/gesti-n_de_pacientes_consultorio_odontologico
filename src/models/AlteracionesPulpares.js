const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlteracionesPulpares', {
    id_pulpar: {
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
    cambio_color: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    fistula: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    sintomatico: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    asintomatico: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AlteracionesPulpares',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pulpar" },
        ]
      },
      {
        name: "fk_pulpares_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
