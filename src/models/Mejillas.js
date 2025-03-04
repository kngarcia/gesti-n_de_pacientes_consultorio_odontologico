const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mejillas', {
    id_mejillas: {
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
    aftas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    herpes: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    liquen_plano: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    otro: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Mejillas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mejillas" },
        ]
      },
      {
        name: "fk_mejillas_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
    ]
  });
};
