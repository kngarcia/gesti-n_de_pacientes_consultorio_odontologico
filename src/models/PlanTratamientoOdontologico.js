const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlanTratamientoOdontologico', {
    id_plan_tratamiento: {
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
    tratamientos_propuestos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PlanTratamientoOdontologico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plan_tratamiento" },
        ]
      },
      {
        name: "fk_tratamiento_historia",
        using: "BTREE",
        fields: [
          { name: "id_historia" },
        ]
      },
    ]
  });
};
