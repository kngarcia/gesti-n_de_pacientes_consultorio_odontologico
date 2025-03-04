const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Textura', {
    id_intra_oral: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IntraOral',
        key: 'id_intra_oral'
      }
    },
    id_textura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
