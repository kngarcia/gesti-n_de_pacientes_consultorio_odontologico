const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlanoFrontal', {
    id_plano_frontal: {
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
    mordedura_abierta: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    mordedura_profunda: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    sobremordida_vertical: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    sobre_mordida_horizontal: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PlanoFrontal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plano_frontal" },
        ]
      },
      {
        name: "fk_PlanoFrontal_AnalisisOclusionATM1_idx",
        using: "BTREE",
        fields: [
          { name: "id_oclusion" },
        ]
      },
    ]
  });
};
