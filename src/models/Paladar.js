const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Paladar', {
    id_paladar: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ojival: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    fisurado: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    torus_platino: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    palatitis_protesica: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    otro: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ExamenEstomatologico_id_examen_estoma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExamenEstomatologico',
        key: 'id_examen_estoma'
      }
    }
  }, {
    sequelize,
    tableName: 'Paladar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paladar" },
        ]
      },
      {
        name: "fk_Paladar_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "ExamenEstomatologico_id_examen_estoma" },
        ]
      },
    ]
  });
};
