import React, { useState, useEffect } from "react";

const coloresPorEstado = {
  Caries: "#f87171",
  Resinas: "#60a5fa",
  Ausente: "#9ca3af",
  Corona: "#facc15",
  Erupción: "#34d399",
  Sano: "#a3e635",
  Núcleo: "#818cf8",
};

const DienteSVG = ({ numero, onEstadoCambiar, estadoInicial = {} }) => {
  const [estadoZonas, setEstadoZonas] = useState(estadoInicial);
  const [showModal, setShowModal] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  useEffect(() => {
    setEstadoZonas(estadoInicial);
  }, [JSON.stringify(estadoInicial)]);

  const cambiarEstado = (zona) => {
    setZonaSeleccionada(zona);
    setShowModal(true);
  };

  const handleCancelar = () => {
    setEstadoZonas(estadoInicial);
    setShowModal(false);
  };

  const aplicarEstado = (zona, estado) => {
    const nuevosEstados = {
      ...estadoZonas,
      [zona]: estado,
    };
    setEstadoZonas(nuevosEstados);
    onEstadoCambiar(numero, nuevosEstados);
    setShowModal(false);
  };

  return (
    <>
      <svg viewBox="0 0 100 100" width="70" height="70">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#fff"
          stroke="#000"
          strokeWidth="2"
        />
        {["superior", "derecha", "inferior", "izquierda"].map((zona, i) => (
          <path
            key={zona}
            d={
              [
                "M50,5 A45,45 0 0,1 95,50 L50,50 Z",
                "M95,50 A45,45 0 0,1 50,95 L50,50 Z",
                "M50,95 A45,45 0 0,1 5,50 L50,50 Z",
                "M5,50 A45,45 0 0,1 50,5 L50,50 Z",
              ][i]
            }
            fill={coloresPorEstado[estadoZonas[zona]] || "#fff"}
            stroke="#000"
            onClick={() => cambiarEstado(zona)}
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill={coloresPorEstado[estadoZonas.centro] || "#fff"}
          stroke="#000"
          onClick={() => cambiarEstado("centro")}
        />
        <text x="50" y="53" fontSize="11" textAnchor="middle" fill="#000">
          {numero}
        </text>
      </svg>

      {showModal && zonaSeleccionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">
              Diente {numero} - Zona {zonaSeleccionada}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(coloresPorEstado).map(([estado, color]) => (
                <button
                  key={estado}
                  className="p-3 rounded-lg text-white font-medium shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: color }}
                  onClick={() => aplicarEstado(zonaSeleccionada, estado)}
                >
                  {estado}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DienteSVG;
