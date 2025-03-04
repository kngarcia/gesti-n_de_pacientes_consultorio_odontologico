const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('labios', {
    id_labios: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_examen_estoma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamenEstomatologico',
        key: 'id_examen_estoma'
      }
    },
    herpes: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    quelitis_angular: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    mucocele: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    frenillo_hipertrofico: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    leocoplasia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    otro: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'labios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_labios" },
        ]
      },
      {
        name: "fk_labios_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
    ]
  });
};
