import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExamenExtraOral from "./ExamenExtraOral";
import ExamenIntraOral from "./ExamenIntraOral";
import VistaExamenClinico from "./VistaExamenClinico";
import { examenService } from "./examenClinicoService";
import Spinner from "../../Spinner";

const ExamenClinico = () => {
  const { patientId } = useParams();

  const [modoEdicion, setModoEdicion] = useState(false);
  const [pasoActual, setPasoActual] = useState("extraoral");
  const [datosExtraOral, setDatosExtraOral] = useState(null);
  const [datosIntraOral, setDatosIntraOral] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const response = await examenService.obtenerPorPaciente(patientId);
      const data = response.data;

      if (data) {
        const extra = Array.isArray(data.ExtraOrals) ? data.ExtraOrals[0] : data.ExtraOrals;
        setDatosExtraOral(extra || {});

        const rawIntra = Array.isArray(data.IntraOrals) ? data.IntraOrals[0] : data.IntraOrals;
        setDatosIntraOral({
          mucosas:       rawIntra?.Mucosas       || "",
          encias:        rawIntra?.Encias        || "",
          textura:       rawIntra?.Texturas      || "",
          tejidosDuros:  rawIntra?.TejidosDuros  || "",
          observaciones: rawIntra?.observaciones || ""
        });

        setModoEdicion(false);
      } else {
        setModoEdicion(true);
      }
    } catch (error) {
      setModoEdicion(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) cargarDatos();
  }, [patientId]);

  const handleSubmitExtraOral = (data) => {
    setDatosExtraOral(data);
    setPasoActual("intraoral");
  };

  const handleSubmitIntraOral = async (intraOralData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const payload = {
        extraOral: datosExtraOral,
        intraOral: {
          observaciones: intraOralData.observaciones,
          mucosas:       intraOralData.mucosas,
          encias:        intraOralData.encias,
          textura:       intraOralData.textura,
          tejidosDuros:  intraOralData.tejidosDuros
        }
      };

      const response = await examenService.crearExamen(patientId, payload);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Examen guardado correctamente");
        setTimeout(async () => {
          await cargarDatos();
          setSuccessMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      setError(error.response?.data?.error || "Error al guardar el examen");
    } finally {
      setLoading(false);
    }
  };

  const datosParaVista = datosExtraOral && datosIntraOral && {
    ExtraOral:     datosExtraOral,
    Mucosas:       datosIntraOral.mucosas,
    Encias:        datosIntraOral.encias,
    Textura:       datosIntraOral.textura,
    TejidosDuros:  datosIntraOral.tejidosDuros,
    Observaciones: { observaciones: datosIntraOral.observaciones }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>
        )}

        {loading && <Spinner />}

        {!loading && !modoEdicion && datosParaVista && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Examen Clínico</h2>
              <button
                onClick={() => {
                  setModoEdicion(true);
                  setPasoActual("extraoral");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                Editar Examen
              </button>
            </div>
            <VistaExamenClinico datos={datosParaVista} />
          </>
        )}

        {!loading && modoEdicion && (
          <>
            {pasoActual === "extraoral" && (
              <ExamenExtraOral
                onSubmit={handleSubmitExtraOral}
                initialData={datosExtraOral}
                disabled={loading}
              />
            )}
            {pasoActual === "intraoral" && (
              <ExamenIntraOral
                onSubmit={handleSubmitIntraOral}
                initialData={datosIntraOral}
                onBack={() => setPasoActual("extraoral")}
                disabled={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamenClinico;
