const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Pacientes', {
    id_paciente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_doctora: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id_usuario'
      }
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    documento_identidad: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "documento_identidad"
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    genero: {
      type: DataTypes.ENUM('Masculino','Femenino','Otro'),
      allowNull: true
    },
    estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    nombre_acompanante: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },

    nombre_acompanante: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'nombre_acompañante' // Nombre real en la base de datos
    },
    telefono_acompanante: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
      field: 'telefono_acompañante'
    },
    nombre_responsable: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    parentesco_responsable: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
    },
    telefono_responsable: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
    },
    
    eps: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cotizante: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true
    },
    beneficiario: {
      type: DataTypes.ENUM('Si','No'),
      allowNull: true
    },
    origen_enfermedad: {
      type: DataTypes.ENUM('Paciente sano','Enfermedad general o común','Enfermedad profesional o ocupacional','Accidente de trabajo','Accidente no de trabajo o fuera del trabajo'),
      allowNull: false
    },
    motivo_consulta: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Pacientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paciente" },
        ]
      },
      {
        name: "documento_identidad",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documento_identidad" },
        ]
      },
      {
        name: "fk_Pacientes_Usuarios1_idx",
        using: "BTREE",
        fields: [
          { name: "id_doctora" },
        ]
      },
    ]
  });
};
