export const SECTION_LABELS = {
    antecedentesOdontologicos: "ANTECEDENTES ODONTOLÓGICOS",
    antecedentesPatologicos: "ANTECEDENTES PATOLÓGICOS",
    antecedentesToxixologicos: "ANTECEDENTES TOXICOLÓGICOS",
    antecedentesHospitalarios: "ANTECEDENTES HOSPITALARIOS",
    antecedentesFamiliares: "ANTECEDENTES FAMILIARES",
    antecedentesGinecoobtetricos: "ANTECEDENTES GINECOOBSTÉTRICOS",
    antecedentesEstomatologicos: "ANTECEDENTES ESTOMATOLÓGICOS"
  };
  
  export const FIELD_LABELS = {
    /* Antecedentes Odontológicos */
    bruxismo: "Bruxismo (rechinar dientes)",
    onicofagia: "Onicofagia (morderse las uñas)",
    mordedura_labio_inferior_superior: "Mordedura de labios",
    succion_digital: "Succión digital (dedo)",
    biberon: "Uso prolongado de biberón",
    deglucion_atipica: "Deglución atípica",
    respirador_bucal: "Respiración bucal",
  
    /* Antecedentes Patológicos */
    hiv: "VIH/SIDA",
    hepatitis: "Hepatitis (tipo si aplica)",
    fiebre_reumatica: "Fiebre reumática",
    diabetes: "Diabetes mellitus",
    ulcera_gastrica_o_hernia_hiatal: "Úlcera gástrica/Hernia hiatal",
    epilepsia: "Epilepsia o convulsiones",
    presion_arterial_alta: "Hipertensión arterial",
    convulsiones: "Convulsiones",
    mareos_frecuentes: "Mareos frecuentes",
    fracturas_accidentes: "Fracturas/Accidentes importantes",
    cicatriza_normalmente: "Cicatrización normal",
    infarto_miocardio: "Infarto al miocardio",
    reemplazo_valvulas: "Reemplazo de válvulas cardíacas",
    perdida_conocimiento: "Pérdidas de conocimiento",
    perdida_peso: "Pérdida de peso inexplicada",
    alergias: "Alergias conocidas",
    descripcion_alergias: "Describa las alergias",
    otros: "Otras condiciones importantes",
    descripcion_otros: "Describa otras condiciones",
  
    /* Antecedentes Toxicológicos */
    fuma: "Consumo de tabaco",
    ingiere_alcohol: "Consumo de alcohol",
    usa_drogas: "Uso de drogas/psicoactivos",
    alergico_anestesia_o_vasoconstrictores: "Alergia a anestésicos/vasoconstrictores",
    toma_medicamentos_actualmente: "Medicación actual",
    alergico_algun_medicamento: "Alergia a medicamentos",
    otros_antecedentes_toxicologicos: "Otros antecedentes importantes",
    descripcion_otros_antecedentes_toxicologicos: "Describa otros antecedentes/medicamentos/alergias",
  
    /* Antecedentes Hospitalarios */
    transfusiones: "Ha recibido transfusiones",
    hospitalizado: "Hospitalizaciones previas",
    razon_hospitalizacion: "Razón de hospitalización",
    operado: "Intervenciones quirúrgicas",
    descripcion_operacion: "Describa intervenciones quirúrgicas",
  
    /* Antecedentes Familiares */
    afecciones_cardiacas: "Enfermedades cardíacas",
    diabetes_familiar: "Diabetes en familiares",
    hipertension: "Hipertensión arterial",
    epilepsia_familiar: "Epilepsia en familiares",
    cancer: "Cáncer (tipo si aplica)",
    tuberculosis: "Tuberculosis",
    otros_antecedentes_familiares: "Otros antecedentes familiares",
    especificacion: "describa otros antecedentes familiares",
  
    /* Antecedentes Ginecoobstétricos */
    toma_anticonseptivos: "Uso de anticonceptivos",
    embarazada: "Embarazo actual",
    meses_embarazo: "Meses de gestación",
    reemplazo_cadera_o_fractura_femur: "Reemplazo de cadera/Fractura de fémur",
  
    /* Antecedentes Estomatológicos */
    luxacion_o_fractura_mandibula: "Luxación/Fractura mandibular",
    amigdalitis: "Amigdalitis recurrente",
    infecciones_orales_a_repeticion: "Infecciones orales recurrentes",
    mal_aliento: "Halitosis crónica",
    fuegos: "Aftas/Herpes recurrentes"
  };
  
  export const INITIAL_FORM_DATA = {
    antecedentesFamiliares: {
      afecciones_cardiacas: 'No',
      diabetes_familiar: 'No',
      hipertension: 'No',
      epilepsia_familiar: 'No',
      cancer: 'No',
      tuberculosis: 'No',
      otros_antecedentes_familiares: 'No',
      especificacion: ''
    },
    antecedentesPatologicos: {
      hiv: 'No',
      hepatitis: 'No',
      fiebre_reumatica: 'No',
      diabetes: 'No',
      ulcera_gastrica_o_hernia_hiatal: 'No',
      epilepsia: 'No',
      presion_arterial_alta: 'No',
      convulsiones: 'No',
      mareos_frecuentes: 'No',
      fracturas_accidentes: 'No',
      cicatriza_normalmente: 'No',
      infarto_miocardio: 'No',
      reemplazo_valvulas: 'No',
      perdida_conocimiento: 'No',
      perdida_peso: 'No',
      alergias: 'No',
      descripcion_alergias: '',
      otros: 'No',
      descripcion_otros: ''
    },
    antecedentesToxixologicos: {
      fuma: 'No',
      ingiere_alcohol: 'No',
      usa_drogas: 'No',
      alergico_anestesia_o_vasoconstrictores: 'No',
      toma_medicamentos_actualmente: 'No',
      alergico_algun_medicamento: 'No',
      otros_antecedentes_toxicologicos: 'No',
      descripcion_otros_antecedentes_toxicologicos: ''
    },
    antecedentesGinecoobtetricos: {
      toma_anticonseptivos: 'No',
      embarazada: 'No',
      meses_embarazo: 0,
      reemplazo_cadera_o_fractura_femur: 'No'
    },
    antecedentesEstomatologicos: {
      luxacion_o_fractura_mandibula: 'No',
      amigdalitis: 'No',
      infecciones_orales_a_repeticion: 'No',
      mal_aliento: 'No',
      fuegos: 'No'
    },
    antecedentesHospitalarios: {
      transfusiones: 'No',
      hospitalizado: 'No',
      razon_hospitalizacion: '',
      operado: 'No',
      descripcion_operacion: ''
    },
    antecedentesOdontologicos: {
      bruxismo: 'No',
      onicofagia: 'No',
      mordedura_labio_inferior_superior: 'No',
      succion_digital: 'No',
      biberon: 'No',
      deglucion_atipica: 'No',
      respirador_bucal: 'No'
    }
  };
  
  export const API_SECTION_MAP = {
    antecedentesOdontologicos: 'AntecedentesOdontologicos',
    antecedentesPatologicos: 'AntecedentesPatologicos',
    antecedentesToxixologicos: 'AntecedentesToxixologicos',
    antecedentesHospitalarios: 'AntecedentesHospitalarios',
    antecedentesFamiliares: 'AntecedentesFamiliares',
    antecedentesGinecoobtetricos: 'AntecedentesGinecoobtetricos',
    antecedentesEstomatologicos: 'AntecedentesEstomatologicos'
  };