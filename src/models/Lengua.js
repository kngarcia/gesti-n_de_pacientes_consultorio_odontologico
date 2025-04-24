const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Lengua', {
    id_lengua: {
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
    macroglosia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    microglosia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    geografica: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    fisurada: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    saburral: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    otro_lengua: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'otro'
    }
  }, {
    sequelize,
    tableName: 'Lengua',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_lengua" },
        ]
      },
      {
        name: "fk_Lengua_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
    ]
  });
};
