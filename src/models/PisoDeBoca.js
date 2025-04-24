const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PisoDeBoca', {
    id_piso_de_boca: {
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
    mucocele_piso_boca: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      field: 'mucocele'
    },
    ranula: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    leucoplasia: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false
    },
    aftas_piso_boca: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      field: 'aftas'
    },
    otro_piso_boca: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'otro'
    }
  }, {
    sequelize,
    tableName: 'PisoDeBoca',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_piso_de_boca" },
        ]
      },
      {
        name: "fk_PisoDeBoca_ExamenEstomatologico1_idx",
        using: "BTREE",
        fields: [
          { name: "id_examen_estoma" },
        ]
      },
    ]
  });
};
