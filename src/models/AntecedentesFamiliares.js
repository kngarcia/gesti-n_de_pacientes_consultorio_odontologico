const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesFamiliares', {
    idFamiliares: {
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
    afecciones_cardiacas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    diabetes_familiar: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No",
      field: 'diabetes'
    },
    hipertension: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    epilepsia_familiar: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No",
      field: 'epilepsia'
    },
    cancer: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    tuberculosis: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    otros_antecedentes_familiares: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true,
      defaultValue: "No",
      field: 'otras'
    },
    especificacion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'AntecedentesFamiliares',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idFamiliares" },
        ]
      },
      {
        name: "fk_AntecedentesFamiliares_Antecedentes_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
