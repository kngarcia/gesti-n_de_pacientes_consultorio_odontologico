const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AnomaliasATM', {
    id_anomalias_atm: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_oclusion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnalisisOclusionATM',
        key: 'id_oclusion'
      }
    },
    ruido_articular: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    difusion_dolorosa: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    'limitación_apertura': {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'AnomaliasATM',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_anomalias_atm" },
        ]
      },
      {
        name: "fk_AnomaliasATM_AnalisisOclusionATM1_idx",
        using: "BTREE",
        fields: [
          { name: "id_oclusion" },
        ]
      },
    ]
  });
};
