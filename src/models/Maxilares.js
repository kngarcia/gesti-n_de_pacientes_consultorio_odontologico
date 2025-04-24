const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Maxilares', {
    id_maxilares: {
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
    macrognasia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    micrognasia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    torus_mandibular: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    otro_maxilares: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'otro'
    }
  }, {
    sequelize,
    tableName: 'Maxilares',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_maxilares" },
        ]
      },
      {
        name: "fk_Maxilares_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
    ]
  });
};
