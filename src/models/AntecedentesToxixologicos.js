const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AntecedentesToxixologicos', {
    id_toxixologicos: {
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
    fuma: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    ingiere_alcohol: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    usa_drogas: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    alergico_anestesia_o_vasoconstrictores: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    toma_medicamentos_actualmente: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    alergico_algun_medicamento: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No"
    },
    otros_antecedentes_toxicologicos: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: false,
      defaultValue: "No",
      field: 'otros'
    },
    descripcion_otros_antecedentes_toxicologicos: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'descripcion_otros'
    }
  }, {
    sequelize,
    tableName: 'AntecedentesToxixologicos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_toxixologicos" },
        ]
      },
      {
        name: "fk_AntecedentesToxixologicos_Antecedentes1_idx",
        using: "BTREE",
        fields: [
          { name: "id_antecedente" },
        ]
      },
    ]
  });
};
