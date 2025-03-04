const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlanoHorizontal', {
    id_plano_horizontal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_oclusion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnalisisOclusionATM',
        key: 'id_oclusion'
      }
    },
    mordida_cruzada_anterior: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    mordida_cruzada_exterior: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    mordida_borde_a_borde: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PlanoHorizontal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plano_horizontal" },
        ]
      },
      {
        name: "fk_PlanoHorizontal_AnalisisOclusionATM1_idx",
        using: "BTREE",
        fields: [
          { name: "id_oclusion" },
        ]
      },
    ]
  });
};
