const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Textura', {
    id_textura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_intra_oral: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IntraOral',
        key: 'id_intra_oral'
      }
    },
    punteado_naranja: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    lisa: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    naranja: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'Textura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_textura" },
        ]
      },
      {
        name: "fk_Textura_IntraOral1_idx",
        using: "BTREE",
        fields: [
          { name: "id_intra_oral" },
        ]
      },
    ]
  });
};
