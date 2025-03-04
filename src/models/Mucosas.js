const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mucosas', {
    id_mucosas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_intra_oral: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IntraOral',
        key: 'id_intra_oral'
      }
    },
    rosadas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    rojas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'Mucosas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mucosas" },
        ]
      },
      {
        name: "fk_Mucosas_IntraOral1_idx",
        using: "BTREE",
        fields: [
          { name: "id_intra_oral" },
        ]
      },
    ]
  });
};
