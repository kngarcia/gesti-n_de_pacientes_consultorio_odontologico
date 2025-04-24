const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntraOral', {
    id_intra_oral: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_examen_clinico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamenClinico',
        key: 'id_examen_clinico'
      }
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'IntraOral',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_intra_oral" },
        ]
      },
      {
        name: "fk_IntraOralTejidosBlandos_ExamenClinico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_clinico" },
        ]
      },
    ]
  });
};
