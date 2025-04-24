var DataTypes = require("sequelize").DataTypes;
var _AlteracionesPeriodontales = require("./AlteracionesPeriodontales");
var _AlteracionesPulpares = require("./AlteracionesPulpares");
var _AnalisisOclusionATM = require("./AnalisisOclusionATM");
var _AnomaliasATM = require("./AnomaliasATM");
var _Antecedentes = require("./Antecedentes");
var _AntecedentesEstomatologicos = require("./AntecedentesEstomatologicos");
var _AntecedentesFamiliares = require("./AntecedentesFamiliares");
var _AntecedentesGinecoobtetricos = require("./AntecedentesGinecoobtetricos");
var _AntecedentesHospitalarios = require("./AntecedentesHospitalarios");
var _AntecedentesOdontologicos = require("./AntecedentesOdontologicos");
var _AntecedentesPatologicos = require("./AntecedentesPatologicos");
var _AntecedentesToxixologicos = require("./AntecedentesToxixologicos");
var _Citas = require("./Citas");
var _DiagnosticoGeneral = require("./DiagnosticoGeneral");
var _Encias = require("./Encias");
var _EstadoDientes = require("./EstadoDientes");
var _ExamenClinico = require("./ExamenClinico");
var _ExamenEstomatologico = require("./ExamenEstomatologico");
var _ExtraOral = require("./ExtraOral");
var _FrecuenciaCepillado = require("./FrecuenciaCepillado");
var _HistoriaClinica = require("./HistoriaClinica");
var _IntraOral = require("./IntraOral");
var _Lengua = require("./Lengua");
var _Maxilares = require("./Maxilares");
var _Mejillas = require("./Mejillas");
var _Mucosas = require("./Mucosas");
var _Pacientes = require("./Pacientes");
var _Paladar = require("./Paladar");
var _PisoDeBoca = require("./PisoDeBoca");
var _PlanTratamientoOdontologico = require("./PlanTratamientoOdontologico");
var _PlanoFrontal = require("./PlanoFrontal");
var _PlanoHorizontal = require("./PlanoHorizontal");
var _PronosticoGeneral = require("./PronosticoGeneral");
var _TejidosDuros = require("./TejidosDuros");
var _Textura = require("./Textura");
var _Usuarios = require("./Usuarios");
var _labios = require("./labios");

function initModels(sequelize) {
  var AlteracionesPeriodontales = _AlteracionesPeriodontales(sequelize, DataTypes);
  var AlteracionesPulpares = _AlteracionesPulpares(sequelize, DataTypes);
  var AnalisisOclusionATM = _AnalisisOclusionATM(sequelize, DataTypes);
  var AnomaliasATM = _AnomaliasATM(sequelize, DataTypes);
  var Antecedentes = _Antecedentes(sequelize, DataTypes);
  var AntecedentesEstomatologicos = _AntecedentesEstomatologicos(sequelize, DataTypes);
  var AntecedentesFamiliares = _AntecedentesFamiliares(sequelize, DataTypes);
  var AntecedentesGinecoobtetricos = _AntecedentesGinecoobtetricos(sequelize, DataTypes);
  var AntecedentesHospitalarios = _AntecedentesHospitalarios(sequelize, DataTypes);
  var AntecedentesOdontologicos = _AntecedentesOdontologicos(sequelize, DataTypes);
  var AntecedentesPatologicos = _AntecedentesPatologicos(sequelize, DataTypes);
  var AntecedentesToxixologicos = _AntecedentesToxixologicos(sequelize, DataTypes);
  var Citas = _Citas(sequelize, DataTypes);
  var DiagnosticoGeneral = _DiagnosticoGeneral(sequelize, DataTypes);
  var Encias = _Encias(sequelize, DataTypes);
  var EstadoDientes = _EstadoDientes(sequelize, DataTypes);
  var ExamenClinico = _ExamenClinico(sequelize, DataTypes);
  var ExamenEstomatologico = _ExamenEstomatologico(sequelize, DataTypes);
  var ExtraOral = _ExtraOral(sequelize, DataTypes);
  var FrecuenciaCepillado = _FrecuenciaCepillado(sequelize, DataTypes);
  var HistoriaClinica = _HistoriaClinica(sequelize, DataTypes);
  var IntraOral = _IntraOral(sequelize, DataTypes);
  var Lengua = _Lengua(sequelize, DataTypes);
  var Maxilares = _Maxilares(sequelize, DataTypes);
  var Mejillas = _Mejillas(sequelize, DataTypes);
  var Mucosas = _Mucosas(sequelize, DataTypes);
  var Pacientes = _Pacientes(sequelize, DataTypes);
  var Paladar = _Paladar(sequelize, DataTypes);
  var PisoDeBoca = _PisoDeBoca(sequelize, DataTypes);
  var PlanTratamientoOdontologico = _PlanTratamientoOdontologico(sequelize, DataTypes);
  var PlanoFrontal = _PlanoFrontal(sequelize, DataTypes);
  var PlanoHorizontal = _PlanoHorizontal(sequelize, DataTypes);
  var PronosticoGeneral = _PronosticoGeneral(sequelize, DataTypes);
  var TejidosDuros = _TejidosDuros(sequelize, DataTypes);
  var Textura = _Textura(sequelize, DataTypes);
  var Usuarios = _Usuarios(sequelize, DataTypes);
  var labios = _labios(sequelize, DataTypes);

  Mucosas.belongsTo(IntraOral, { as: "id_intra_oral_IntraOral", foreignKey: "id_intra_oral"});
  IntraOral.hasOne(Mucosas, { as: "Mucosas", foreignKey: "id_intra_oral"});
  TejidosDuros.belongsTo(IntraOral, { as: "id_intra_oral_IntraOral", foreignKey: "id_intra_oral"});
  IntraOral.hasOne(TejidosDuros, { as: "TejidosDuros", foreignKey: "id_intra_oral"});
  Textura.belongsTo(IntraOral, { as: "id_intra_oral_IntraOral", foreignKey: "id_intra_oral"});
  IntraOral.hasOne(Textura, { as: "Texturas", foreignKey: "id_intra_oral"});
  Encias.belongsTo(IntraOral, { as: "id_intra_oral_IntraOral", foreignKey: "id_intra_oral"});
  IntraOral.hasOne(Encias, { as: "Encias", foreignKey: "id_intra_oral"});
  AnomaliasATM.belongsTo(AnalisisOclusionATM, { as: "id_oclusion_AnalisisOclusionATM", foreignKey: "id_oclusion"});
  AnalisisOclusionATM.hasMany(AnomaliasATM, { as: "AnomaliasATMs", foreignKey: "id_oclusion"});
  PlanoFrontal.belongsTo(AnalisisOclusionATM, { as: "id_oclusion_AnalisisOclusionATM", foreignKey: "id_oclusion"});
  AnalisisOclusionATM.hasMany(PlanoFrontal, { as: "PlanoFrontals", foreignKey: "id_oclusion"});
  PlanoHorizontal.belongsTo(AnalisisOclusionATM, { as: "id_oclusion_AnalisisOclusionATM", foreignKey: "id_oclusion"});
  AnalisisOclusionATM.hasMany(PlanoHorizontal, { as: "PlanoHorizontals", foreignKey: "id_oclusion"});
  AntecedentesEstomatologicos.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesEstomatologicos, { as: "AntecedentesEstomatologicos", foreignKey: "id_antecedente"});
  AntecedentesFamiliares.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesFamiliares, { as: "AntecedentesFamiliares", foreignKey: "id_antecedente"});
  AntecedentesGinecoobtetricos.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesGinecoobtetricos, { as: "AntecedentesGinecoobtetricos", foreignKey: "id_antecedente"});
  AntecedentesHospitalarios.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesHospitalarios, { as: "AntecedentesHospitalarios", foreignKey: "id_antecedente"});
  AntecedentesOdontologicos.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesOdontologicos, { as: "AntecedentesOdontologicos", foreignKey: "id_antecedente"});
  AntecedentesPatologicos.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesPatologicos, { as: "AntecedentesPatologicos", foreignKey: "id_antecedente"});
  AntecedentesToxixologicos.belongsTo(Antecedentes, { as: "id_antecedente_Antecedente", foreignKey: "id_antecedente"});
  Antecedentes.hasOne(AntecedentesToxixologicos, { as: "AntecedentesToxixologicos", foreignKey: "id_antecedente"});
  EstadoDientes.belongsTo(ExamenClinico, { as: "id_examen_clinico_ExamenClinico", foreignKey: "id_examen_clinico"});
  ExamenClinico.hasOne(EstadoDientes, { as: "EstadoDientes", foreignKey: "id_examen_clinico"});
  ExtraOral.belongsTo(ExamenClinico, { as: "id_examen_clinico_ExamenClinico", foreignKey: "id_examen_clinico"});
  ExamenClinico.hasOne(ExtraOral, { as: "ExtraOrals", foreignKey: "id_examen_clinico"});
  IntraOral.belongsTo(ExamenClinico, { as: "id_examen_clinico_ExamenClinico", foreignKey: "id_examen_clinico"});
  ExamenClinico.hasOne(IntraOral, { as: "IntraOrals", foreignKey: "id_examen_clinico"});
  Lengua.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(Lengua, { as: "Lenguas", foreignKey: "id_examen_estoma"});
  Maxilares.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(Maxilares, { as: "Maxilares", foreignKey: "id_examen_estoma"});
  Mejillas.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(Mejillas, { as: "Mejillas", foreignKey: "id_examen_estoma"});
  Paladar.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(Paladar, { as: "Paladars", foreignKey: "id_examen_estoma"});
  PisoDeBoca.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(PisoDeBoca, { as: "PisoDeBocas", foreignKey: "id_examen_estoma"});
  labios.belongsTo(ExamenEstomatologico, { as: "id_examen_estoma_ExamenEstomatologico", foreignKey: "id_examen_estoma"});
  ExamenEstomatologico.hasMany(labios, { as: "labios", foreignKey: "id_examen_estoma"});
  AlteracionesPeriodontales.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(AlteracionesPeriodontales, { as: "AlteracionesPeriodontales", foreignKey: "id_historia"});
  AlteracionesPulpares.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(AlteracionesPulpares, { as: "AlteracionesPulpares", foreignKey: "id_historia"});
  AnalisisOclusionATM.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(AnalisisOclusionATM, { as: "AnalisisOclusionATMs", foreignKey: "id_historia"});
  Antecedentes.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(Antecedentes, { as: "Antecedentes", foreignKey: "id_historia"});
  DiagnosticoGeneral.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(DiagnosticoGeneral, { as: "DiagnosticoGenerals", foreignKey: "id_historia"});
  ExamenClinico.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(ExamenClinico, { as: "ExamenClinicos", foreignKey: "id_historia"});
  ExamenEstomatologico.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(ExamenEstomatologico, { as: "ExamenEstomatologicos", foreignKey: "id_historia"});
  FrecuenciaCepillado.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasOne(FrecuenciaCepillado, { as: "FrecuenciaCepillados", foreignKey: "id_historia"});
  PlanTratamientoOdontologico.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(PlanTratamientoOdontologico, { as: "PlanTratamientoOdontologicos", foreignKey: "id_historia"});
  PronosticoGeneral.belongsTo(HistoriaClinica, { as: "id_historia_HistoriaClinica", foreignKey: "id_historia"});
  HistoriaClinica.hasMany(PronosticoGeneral, { as: "PronosticoGenerals", foreignKey: "id_historia"});
  Citas.belongsTo(Pacientes, { as: "Paciente", foreignKey: "id_paciente"});
  Pacientes.hasMany(Citas, { as: "Citas", foreignKey: "id_paciente"});
  HistoriaClinica.belongsTo(Pacientes, { as: "historia_p", foreignKey: "id_paciente"});
  Pacientes.hasOne(HistoriaClinica, { as: "HistoriaClinica", foreignKey: "id_paciente"});
  Citas.belongsTo(Usuarios, { as: "Auxiliar", foreignKey: "id_auxiliar"});
  Usuarios.hasMany(Citas, { as: "Citas", foreignKey: "id_auxiliar"});
  Pacientes.belongsTo(Usuarios, { as: "id_doctora_Usuario", foreignKey: "id_doctora"});
  Usuarios.hasMany(Pacientes, { as: "Pacientes", foreignKey: "id_doctora"});

  return {
    AlteracionesPeriodontales,
    AlteracionesPulpares,
    AnalisisOclusionATM,
    AnomaliasATM,
    Antecedentes,
    AntecedentesEstomatologicos,
    AntecedentesFamiliares,
    AntecedentesGinecoobtetricos,
    AntecedentesHospitalarios,
    AntecedentesOdontologicos,
    AntecedentesPatologicos,
    AntecedentesToxixologicos,
    Citas,
    DiagnosticoGeneral,
    Encias,
    EstadoDientes,
    ExamenClinico,
    ExamenEstomatologico,
    ExtraOral,
    FrecuenciaCepillado,
    HistoriaClinica,
    IntraOral,
    Lengua,
    Maxilares,
    Mejillas,
    Mucosas,
    Pacientes,
    Paladar,
    PisoDeBoca,
    PlanTratamientoOdontologico,
    PlanoFrontal,
    PlanoHorizontal,
    PronosticoGeneral,
    TejidosDuros,
    Textura,
    Usuarios,
    labios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
