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
    herpes_labios: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No",
      field: "herpes"
    },
    quelitis_angular: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    mucocele_labios: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No",
      field: "mucocele"
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
    otro_labios: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "otro"
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
