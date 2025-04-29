import { useState, useEffect } from "react";
import ExamenEstomatologico from "./ExamenEstomatologico";
import { guardarOdontograma } from "../../../src/services/guardarOdontograma";

const Odontograma = ({ onBack }) => {
  const [mostrarExamenEstomatologico, setMostrarExamenEstomatologico] =
    useState(false);

  // 🆔 ID del examen clínico válido (ya creado en tu base de datos)
  const id_examen_clinico = 2;

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          console.log(`✅ Script cargado: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`❌ Error cargando script: ${src}`);
          reject();
        };
        document.body.appendChild(script);
      });
    };

    async function loadEngine() {
      try {
        await loadScript("/engine/constants.js");
        await loadScript("/engine/settings.js");
        await loadScript("/engine/rect.js");
        await loadScript("/engine/damage.js");
        await loadScript("/engine/textBox.js");
        await loadScript("/engine/tooth.js");
        await loadScript("/engine/menuItem.js");
        await loadScript("/engine/renderer.js");
        await loadScript("/engine/odontogramaGenerator.js");
        await loadScript("/engine/collisionHandler.js");
        await loadScript("/engine/engine.js");

        console.log("🧠 Todos los scripts del motor odontograma cargados");

        if (window.Engine) {
          const canvas = document.getElementById("canvas");
          const engine = new window.Engine();

          engine.setCanvas(canvas);
          engine.init();

          canvas.addEventListener("mousedown", (event) =>
            engine.onMouseClick(event)
          );
          canvas.addEventListener("mousemove", (event) =>
            engine.onMouseMove(event)
          );
          window.addEventListener("keydown", (event) =>
            engine.onButtonClick(event)
          );

          engine.loadPatientData(
            "Bogotá",
            "Nombre del Paciente",
            "1234",
            "hc123",
            "10/04/2025",
            "Odontólogo/a",
            "Observaciones...",
            "Especificaciones..."
          );

          window.odontogramaEngine = engine;
        } else {
          console.error("❌ window.Engine no está disponible");
        }
      } catch (error) {
        console.error("❌ Error al cargar los scripts del motor", error);
      }
    }

    loadEngine();
  }, []);

  const mapZona = (zona) => {
    const zonasValidas = [
      "mesial",
      "distal",
      "oclusal",
      "lingual",
      "vestibular",
      "general",
    ];
    return zonasValidas.includes(zona) ? zona : "general";
  };

  const mapAfectacion = (afectacion) => {
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
    return afectacionesValidas.includes(afectacion) ? afectacion : "Caries";
  };

  const handleSiguiente = async () => {
    try {
      const engine = window.odontogramaEngine;
      if (!engine) throw new Error("Motor de odontograma no disponible");

      const dientesRaw = engine.exportDentalStatus();

      const dientes = dientesRaw.map((d) => ({
        numero: d.numero,
        zona: mapZona(d.zona),
        afectacion: mapAfectacion(d.afectacion),
        observacion: d.observacion || "",
      }));

      const respuesta = await guardarOdontograma(id_examen_clinico, dientes);
      console.log("✅ Respuesta del backend:", respuesta);

      setMostrarExamenEstomatologico(true);
    } catch (error) {
      console.error("❌ Error al guardar el odontograma:", error);
      alert("❌ Ocurrió un error al guardar el odontograma.");
    }
  };

  if (mostrarExamenEstomatologico) {
    return (
      <ExamenEstomatologico
        onBack={() => setMostrarExamenEstomatologico(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Odontograma
        </h2>
        <canvas
          id="canvas"
          width="648"
          height="800"
          className="border border-gray-300 rounded-md mx-auto"
        ></canvas>
        <div className="flex justify-end gap-4 pt-8 border-t mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={handleSiguiente}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;
