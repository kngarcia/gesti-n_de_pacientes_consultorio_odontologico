const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesHospitalarios', {
    id_Hospitalarios: {
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
    transfusiones: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    hospitalizado: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    razon_hospitalizacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    operado: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    descripcion_operacion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AntecedentesHospitalarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Hospitalarios" },
        ]
      },
      {
        name: "fk_AntecedentesHospitalarios_Antecedentes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
