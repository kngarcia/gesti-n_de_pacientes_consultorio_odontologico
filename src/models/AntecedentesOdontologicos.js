const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesOdontologicos', {
    id_Odontologicos: {
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
    bruxismo: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    onicofagia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    mordedura_labio_inferior_superior: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    succion_digital: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    biberon: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    deglucion_atipica: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    respirador_bucal: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'AntecedentesOdontologicos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Odontologicos" },
        ]
      },
      {
        name: "fk_AntecedentesOdontologicos_Antecedentes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
