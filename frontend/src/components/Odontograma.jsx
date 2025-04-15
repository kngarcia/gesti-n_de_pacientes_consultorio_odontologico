import { useState, useEffect } from "react";
import ExamenEstomatologico from "./ExamenEstomatologico";

const Odontograma = ({ onBack }) => {
  const [mostrarExamenEstomatologico, setMostrarExamenEstomatologico] =
    useState(false);

  useEffect(() => {
    // Cargar el script del engine de forma dinámica
    const script = document.createElement("script");
    script.src = "/engine/engine.js"; // Ruta desde public
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
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
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
            onClick={() => setMostrarExamenEstomatologico(true)}
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
