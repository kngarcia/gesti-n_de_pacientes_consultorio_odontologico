// models/Citas.js
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Citas', {
    id_cita: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: true, // Cambiado a true para permitir nulos
      references: {
        model: 'Pacientes',
        key: 'id_paciente'
      }
    },
    id_auxiliar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id_usuario'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente','atendida','cancelada'),
      allowNull: true,
      defaultValue: "pendiente"
    },
    motivo_cita: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Nuevos campos para pacientes espontáneos
    nombre_espontaneo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    documento_espontaneo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    telefono_espontaneo: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Citas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cita" },
        ]
      },
      {
        name: "fk_pacientes_cita",
        using: "BTREE",
        fields: [
          { name: "id_paciente" },
        ]
      },
      {
        name: "fk_auxiliar_cita",
        using: "BTREE",
        fields: [
          { name: "id_auxiliar" },
        ]
      },
      // Nuevos índices para búsquedas
      {
        name: "idx_documento_espontaneo",
        using: "BTREE",
        fields: [
          { name: "documento_espontaneo" },
        ]
      }
    ]
  });
};