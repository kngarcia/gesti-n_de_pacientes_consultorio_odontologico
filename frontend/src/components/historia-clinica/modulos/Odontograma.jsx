import React, { useEffect, useState } from "react";
import DienteSVG from "./Odontograma/DienteSVG";
import { useParams } from "react-router-dom";
import odontogramaService from "./odontogramaService";
import axios from "axios";

const dientesSuperiores = [
  18, 17, 16, 15, 14, 13, 12, 11, 55, 54, 53, 52, 51, 21, 22, 23, 24, 25, 26,
  27, 28, 61, 62, 63, 64, 65,
];
const dientesInferiores = [
  85, 84, 83, 82, 81, 48, 47, 46, 45, 44, 43, 42, 41, 71, 72, 73, 74, 75, 31,
  32, 33, 34, 35, 36, 37, 38,
];

const coloresPorEstado = {
  Caries: "#f87171",
  Resinas: "#60a5fa",
  Ausente: "#9ca3af",
  Corona: "#facc15",
  Erupción: "#34d399",
  Sano: "#a3e635",
  Núcleo: "#818cf8",
};

const Notificacion = ({ mensaje, tipo, onCerrar }) => {
  const colores = {
    exito: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };

  return (
    <div
      className={`${colores[tipo]} border-l-4 p-4 fixed top-4 right-4 min-w-[300px] rounded-lg shadow-lg flex justify-between items-center z-50`}
    >
      <span>{mensaje}</span>
      <button
        onClick={onCerrar}
        className="ml-4 text-xl font-semibold hover:opacity-75"
      >
        &times;
      </button>
    </div>
  );
};

const Odontograma = () => {
  const { patientId } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [odontograma, setOdontograma] = useState({});
  const [odontogramaOriginal, setOdontogramaOriginal] = useState({});
  const [planTratamiento, setPlanTratamiento] = useState("");
  const [planTratamientoOriginal, setPlanTratamientoOriginal] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showNotificacion, setShowNotificacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("exito");
  const [cargandoPaciente, setCargandoPaciente] = useState(true);
  const [fileRadiografia, setFileRadiografia] = useState(null);
  const [tieneRadiografia, setTieneRadiografia] = useState(false);

  // Subir PDF
  const uploadRadiografia = async () => {
    if (!fileRadiografia) return alert("Selecciona un PDF");
    try {
      const formData = new FormData();
      formData.append("radiografia", fileRadiografia);
      await axios.post(
        `http://localhost:3000/api/odontograma/paciente/${patientId}/radiografia`,
        formData
      );
      setTieneRadiografia(true);
      setMensajeNotificacion("✅ Radiografía subida correctamente");
      setTipoNotificacion("exito");
      setShowNotificacion(true);
    } catch (err) {
      console.error(err);
      setMensajeNotificacion("❌ Error al subir radiografía");
      setTipoNotificacion("error");
      setShowNotificacion(true);
    }
  };

  // Abrir PDF en nueva pestaña
  const downloadRadiografia = async () => {
    if (!tieneRadiografia) return alert("No hay radiografía para mostrar");
    try {
      const resp = await axios.get(
        `http://localhost:3000/api/odontograma/paciente/${patientId}/radiografia`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(resp.data);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error("Error descargando radiografía:", err);
      alert("Error al descargar.");
    }
  };

  const mapearZonaDesdeEstado = (estado) => {
    const zonas = {
      Caries: "superior",
      Resinas: "inferior",
      Ausente: "izquierda",
      Corona: "derecha",
      Erupción: "centro",
      Sano: "centro",
      Núcleo: "centro",
    };
    return zonas[estado] || "centro";
  };

  useEffect(() => {
    const cargarDatosPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/pacientes/${patientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al obtener paciente");

        const data = await response.json();
        setPaciente(data);
      } catch (error) {
        console.error("Error cargando datos del paciente:", error);
      } finally {
        setCargandoPaciente(false);
      }
    };

    cargarDatosPaciente();
  }, [patientId]);

  useEffect(() => {
    const cargarOdontograma = async () => {
      try {
        const res = await odontogramaService.obtenerOdontograma(patientId);
        if (res?.data) {
          const agrupado = {};
          const contarEstadosPorDiente = {};

          res.data.dientes.forEach(({ numero, estado, zona }) => {
            if (!agrupado[numero]) agrupado[numero] = {};
            if (!contarEstadosPorDiente[numero])
              contarEstadosPorDiente[numero] = {};

            contarEstadosPorDiente[numero][estado] =
              (contarEstadosPorDiente[numero][estado] || 0) + 1;

            if (!agrupado[numero][zona]) {
              agrupado[numero][zona] = estado;
            } else {
              console.warn(
                `Zona duplicada para diente ${numero}, zona ${zona}`
              );
            }
          });

          setOdontograma(agrupado);
          setOdontogramaOriginal(agrupado);

          setPlanTratamiento(res.data.plan_tratamiento || "");
          setPlanTratamientoOriginal(res.data.plan_tratamiento || "");
          setTieneRadiografia(!!res.data.tieneRadiografia);
        }
      } catch (error) {
        console.error("❌ Error al cargar odontograma:", error);
      }
    };

    if (patientId) {
      cargarOdontograma();
    }
  }, [patientId]);

  useEffect(() => {
    if (showNotificacion) {
      const timer = setTimeout(() => {
        setShowNotificacion(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotificacion]);

  const manejarCambio = (numero, estadosZona) => {
    setOdontograma((prev) => ({
      ...prev,
      [numero]: estadosZona,
    }));
  };

  const toggleEdicion = () => {
    if (modoEdicion) {
      setOdontograma(odontogramaOriginal);
      setPlanTratamiento(planTratamientoOriginal);
    }
    setModoEdicion((prev) => !prev);
  };

  const guardarOdontograma = async () => {
    try {
      const dientes = [];
      for (const numero in odontograma) {
        const zonas = odontograma[numero];
        for (const zona in zonas) {
          dientes.push({
            numero: parseInt(numero),
            estado: zonas[zona],
            zona,
          });
        }
      }

      await odontogramaService.crearOdontograma(patientId, {
        dientes,
        plan_tratamiento: planTratamiento,
      });

      setOdontogramaOriginal(odontograma);
      setPlanTratamientoOriginal(planTratamiento);
      setModoEdicion(false);
      setMensajeNotificacion("✅ Odontograma guardado correctamente");
      setTipoNotificacion("exito");
      setShowNotificacion(true);
    } catch (error) {
      console.error("❌ Error guardando odontograma:", error);
      setMensajeNotificacion("❌ Error al guardar el odontograma");
      setTipoNotificacion("error");
      setShowNotificacion(true);
    }
  };

  return (
    <div className="p-4 relative">
      {showNotificacion && (
        <Notificacion
          mensaje={mensajeNotificacion}
          tipo={tipoNotificacion}
          onCerrar={() => setShowNotificacion(false)}
        />
      )}

      <div className="mb-6">
        {cargandoPaciente ? (
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-700">
              Odontograma Funcional
            </h2>
            <div className="text-gray-600">
              {paciente ? (
                <>
                  <p>Paciente: {paciente.nombre_completo}</p>
                  <p>Documento: {paciente.documento_identidad}</p>
                </>
              ) : (
                `Paciente #${patientId}`
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2"
          onClick={toggleEdicion}
        >
          {modoEdicion ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancelar edición
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Editar Odontograma
            </>
          )}
        </button>
      </div>

      {/* 🦷 Dientes Superiores */}
      <h3 className="text-lg font-semibold text-gray-600 mb-2 text-center">
        Dientes Superiores
      </h3>

      <div className="flex flex-col items-center gap-2 mb-6">
        {/* Línea 1: Superiores permanentes (con separación al centro) */}
        <div className="flex gap-2">
          {[18, 17, 16, 15, 14, 13, 12, 11].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
          <div className="w-6" /> {/* Espacio visual al centro */}
          {[21, 22, 23, 24, 25, 26, 27, 28].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
        </div>

        {/* Línea 2: Superiores temporales */}
        <div className="flex gap-2">
          {[55, 54, 53, 52, 51].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
          <div className="w-6" />
          {[61, 62, 63, 64, 65].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
        </div>
      </div>

      {/* 🦷 Dientes Inferiores */}
      <h3 className="text-lg font-semibold text-gray-600 mb-2 text-center">
        Dientes Inferiores
      </h3>

      <div className="flex flex-col items-center gap-2 mb-6">
        {/* Línea 1: Inferiores permanentes + temporales izquierda */}
        <div className="flex gap-2">
          {[85, 84, 83, 82, 81].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
          <div className="w-6" />
          {[71, 72, 73, 74, 75].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
        </div>

        {/* Línea 2: Temporales inferiores derechos */}
        <div className="flex gap-2">
          {[48, 47, 46, 45, 44, 43, 42, 41].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
          <div className="w-6" />
          {[31, 32, 33, 34, 35, 36, 37, 38].map((num) => (
            <DienteSVG
              key={num}
              numero={num}
              estadoInicial={odontograma[num]}
              onEstadoCambiar={modoEdicion ? manejarCambio : null}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">
          Color Estados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(coloresPorEstado).map(([estado, color]) => (
            <div key={estado} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-sm shadow-sm border border-gray-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-700">{estado}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block font-medium text-gray-700 mb-2">
          Plan de tratamiento
        </label>
        {modoEdicion ? (
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={planTratamiento}
            onChange={(e) => setPlanTratamiento(e.target.value)}
            placeholder="Escribe aquí el plan de tratamiento..."
          />
        ) : (
          <div className="w-full min-h-[8rem] bg-gray-50 rounded-md p-2 whitespace-pre-wrap border border-transparent">
            {planTratamiento || (
              <span className="text-gray-400 italic">
                No hay plan de tratamiento registrado
              </span>
            )}
          </div>
        )}
      </div>
      {modoEdicion && (
        <div className="mt-4">
          <label className="block mb-2 font-medium">
            Subir radiografía (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileRadiografia(e.target.files[0])}
          />
          <button
            onClick={uploadRadiografia}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Subir
          </button>
        </div>
      )}
      {modoEdicion && (
        <div className="flex justify-end mt-6">
          <button
            onClick={guardarOdontograma}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
            Guardar Odontograma
          </button>
        </div>
      )}
      {/* Descarga: siempre visible, activado solo si hay PDF */}
      <div className="mt-4">
        <button
          onClick={downloadRadiografia}
          disabled={!tieneRadiografia}
          className={`px-4 py-2 rounded text-white ${
            tieneRadiografia
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {tieneRadiografia ? "Ver Radiografía" : "No hay radiografía"}
        </button>
      </div>
    </div>
  );
};

export default Odontograma;
