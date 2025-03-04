const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesEstomatologicos', {
    id_Estomatologicos: {
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
    luxacion_o_fractura_mandibula: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    amigdalitis: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    infecciones_orales_a_repeticion: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    mal_aliento: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    fuegos: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'AntecedentesEstomatologicos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Estomatologicos" },
        ]
      },
      {
        name: "fk_AntecedentesEstomatologicos_Antecedentes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
