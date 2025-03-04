const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TejidosDuros', {
    id_tejidos_duros: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_intra_oral: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IntraOral',
        key: 'id_intra_oral'
      }
    },
    atrision: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    abrasion: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    erosion: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    mal_posicion: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    diastema: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    des_line_m_dental: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    'alteracion_tamaño': {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    alteracion_forma: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    alteracion_numero: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    facetas_desgaste: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    manchas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    }
  }, {
    sequelize,
    tableName: 'TejidosDuros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tejidos_duros" },
        ]
      },
      {
        name: "fk_TejidosDuros_IntraOral1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_intra_oral" },
        ]
      },
    ]
  });
};
