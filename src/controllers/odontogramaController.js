const { EstadoDientes, HistoriaClinica, ExamenClinico } = require("../models");

// Valores permitidos según tu base de datos
const zonasValidas = [
  "mesial",
  "distal",
  "oclusal",
  "lingual",
  "vestibular",
  "general",
];

const afectacionesValidas = [
  "Caries",
  "Corona",
  "Corona (Tmp)",
  "Faltante",
  "Fractura",
  "Diastema",
  "Relleno",
  "Rem Prost",
  "A la deriva",
  "Rotación",
  "Fusión",
  "Resto de raíz",
  "Erupción",
  "Transposición",
  "Supernumerario",
  "Pulp",
  "Prótesis",
  "Tornillo",
  "Fixed Ortho",
  "Fixed Prost",
  "Implante",
  "Macrodoncia",
  "Microdoncia",
  "Discrómico",
  "Gastado",
  "Semi Impactado",
  "Intrusión",
  "Edentulismo",
  "Ectópico",
  "Impactado",
  "Rem Orthodo",
  "Extrusión",
  "Post",
];

exports.guardarOdontograma = async (req, res) => {
  try {
    console.log("📥 Body recibido:", req.body);

    const { id_paciente, dientes } = req.body;

    if (!id_paciente || !Array.isArray(dientes)) {
      console.log("⚠️ Datos faltantes:", { id_paciente, dientes });
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    console.log(
      "🔎 Buscando/creando historia clínica para paciente:",
      id_paciente
    );
    const [historia] = await HistoriaClinica.findOrCreate({
      where: { id_paciente },
    });

    console.log("📄 Historia clínica:", historia?.id_historia);

    const [examen] = await ExamenClinico.findOrCreate({
      where: { id_historia: historia.id_historia },
    });

    console.log("🧪 Examen clínico:", examen?.id_examen_clinico);

    const registros = dientes
      .map((d) => {
        const registro = {
          id_examen_clinico: examen.id_examen_clinico,
          numero_diente: d.numero,
          zona_afectada: zonasValidas.includes(d.zona) ? d.zona : "general",
          tipo_afectacion: afectacionesValidas.includes(d.afectacion)
            ? d.afectacion
            : null,
          observacion: d.observacion || null,
        };
        console.log("🦷 Registro procesado:", registro);
        return registro;
      })
      .filter((r) => r.tipo_afectacion);

    if (registros.length === 0) {
      console.log("❌ No hay registros válidos para guardar");
      return res
        .status(400)
        .json({ error: "No hay registros válidos para guardar." });
    }

    console.log("💾 Guardando registros dentales...");
    await EstadoDientes.bulkCreate(registros);
    console.log("✅ Registros guardados correctamente");

    res.status(201).json({
      mensaje: "Odontograma guardado con éxito",
      id_examen_clinico: examen.id_examen_clinico,
    });
  } catch (error) {
    console.error("❌ Error capturado al guardar odontograma:");
    console.error("📌 Mensaje:", error.message);
    console.error("📌 Detalle completo:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalle: error.message });
  }
};
