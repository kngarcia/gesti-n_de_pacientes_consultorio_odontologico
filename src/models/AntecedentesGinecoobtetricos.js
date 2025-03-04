const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesGinecoobtetricos', {
    id_Ginecoobtetricos: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_antecedente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Antecedentes',
        key: 'id_antecedente'
      }
    },
    toma_anticonseptivos: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    embarazada: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    meses_embarazo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reemplazo_cadera_o_fractura_femur: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'AntecedentesGinecoobtetricos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Ginecoobtetricos" },
        ]
      },
      {
        name: "fk_AntecedentesGinecoobtetricos_Antecedentes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
