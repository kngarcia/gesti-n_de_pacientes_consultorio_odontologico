const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FrecuenciaCepillado', {
    id_cepillado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_historia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HistoriaClinica',
        key: 'id_historia'
      }
    },
    cepillado_veces_dia: {
      type: DataTypes.ENUM('0','1','2','3','4','+5'),
      allowNull: false,
      defaultValue: "0"
    },
    ceda_detal_veces_al_dia: {
      type: DataTypes.ENUM('0','1','2','3','4','+5'),
      allowNull: false,
      defaultValue: "0"
    },
    ultima_visita_odontologo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FrecuenciaCepillado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cepillado" },
        ]
      },
      {
        name: "fk_frecuencia_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
