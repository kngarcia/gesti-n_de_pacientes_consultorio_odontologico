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
        // ExtraOrals viene como array
        const extra = Array.isArray(data.ExtraOrals) ? data.ExtraOrals[0] : data.ExtraOrals;
        setDatosExtraOral(extra || {});

        // IntraOrals viene como array y con mayúsculas en campos
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Examen Clínico Oral</h2>
          <div className="w-20"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{successMessage}</div>
        )}

        {loading && <Spinner />}

        {!loading && !modoEdicion && datosParaVista && (
          <VistaExamenClinico
            datos={datosParaVista}
            onEdit={() => {
              setModoEdicion(true);
              setPasoActual("extraoral");
            }}
          />
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
