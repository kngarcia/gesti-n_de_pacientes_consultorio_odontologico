const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ExtraOral', {
    id_extra_oral: {
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
    adenopatias: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    derecho: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true,
      defaultValue: "No"
    },
    izquierdo: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true,
      defaultValue: "No"
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
    },
    otro_tipo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'ExtraOral',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_extra_oral" },
        ]
      },
      {
        name: "fk_ExtraOral_ExamenClinico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_clinico" },
        ]
      },
    ]
  });
};
