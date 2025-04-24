import { useState, useEffect } from "react";
import Spinner from "../Spinner";

import { PacienteRegistrado } from "./PacienteRegistrado";
import { PacienteEspontaneo } from "./PacienteEspontaneo";
import { SelectorTipoPaciente } from "./SelectorTipoPaciente";

const FormularioCita = ({ 
  onCitaCreada, 
  onCancelar, 
  citaExistente, 
  modoEdicion = false 
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    id_paciente: "",
    id_auxiliar: "",
    fecha: "",
    estado: "pendiente",
    motivo_cita: "",
    // Campos para paciente espontáneo
    nombre_espontaneo: "",
    documento_espontaneo: "",
    telefono_espontaneo: "",
    tipo_paciente: "registrado" // 'registrado' o 'espontaneo'
  });

  // Estados para búsqueda de paciente
  const [documentoBusqueda, setDocumentoBusqueda] = useState("");
  const [foundPatient, setFoundPatient] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [searching, setSearching] = useState(false);

  // Estados para auxiliares
  const [auxiliares, setAuxiliares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Formateo de fechas
  const formatForDateTimeInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
  };

  // Inicialización
  useEffect(() => {
    if (citaExistente) {
      const isEspontaneo = !citaExistente.id_paciente;
      
      setFormData({
        id_cita: citaExistente.id_cita,
        id_paciente: citaExistente.id_paciente || "",
        id_auxiliar: citaExistente.id_auxiliar,
        fecha: formatForDateTimeInput(citaExistente.fecha),
        estado: citaExistente.estado,
        motivo_cita: citaExistente.motivo_cita,
        tipo_paciente: isEspontaneo ? "espontaneo" : "registrado",
        // Campos espontáneos
        nombre_espontaneo: isEspontaneo ? citaExistente.nombre_espontaneo : "",
        documento_espontaneo: isEspontaneo ? citaExistente.documento_espontaneo : "",
        telefono_espontaneo: isEspontaneo ? citaExistente.telefono_espontaneo : ""
      });

      // Si es paciente registrado, cargar sus datos
      if (!isEspontaneo) {
        setFoundPatient({
          id_paciente: citaExistente.id_paciente,
          nombre_completo: citaExistente.Paciente?.nombre_completo,
          documento_identidad: citaExistente.Paciente?.documento_identidad,
          telefono: citaExistente.Paciente?.telefono,
          edad: citaExistente.Paciente?.edad,
          eps: citaExistente.Paciente?.eps
        });
      }
    } else {
      const now = new Date();
      setFormData(prev => ({
        ...prev,
        fecha: formatForDateTimeInput(now.toISOString())
      }));
    }
  }, [citaExistente]);

  // Cargar auxiliares (solo en modo creación)
  useEffect(() => {
    if (!modoEdicion) {
      const fetchAuxiliares = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:3000/api/usuarios?rol=auxiliar", {
            headers: { "Authorization": `Bearer ${token}` },
          });

          if (!response.ok) throw new Error("Error al cargar auxiliares");

          const data = await response.json();
          setAuxiliares(data);
          
          // Si solo hay un auxiliar, seleccionarlo por defecto
          if (data.length === 1) {
            setFormData(prev => ({ ...prev, id_auxiliar: data[0].id_usuario }));
          }
        } catch (err) {
          console.error("Error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchAuxiliares();
    }
  }, [modoEdicion]);

  // Buscar paciente (solo en creación y para pacientes registrados)
  const handleSearchPatient = async () => {
    if (!documentoBusqueda.trim()) {
      setSearchError("Por favor ingrese un documento");
      return;
    }

    try {
      setSearching(true);
      setSearchError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/citas/buscar-paciente?documento=${documentoBusqueda.trim()}`, 
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error("Error en la búsqueda");
      
      const data = await response.json();
      
      if (!data.encontrado) {
        throw new Error("No se encontró paciente con ese documento");
      }

      setFoundPatient(data.paciente);
      setFormData(prev => ({ 
        ...prev, 
        id_paciente: data.paciente.id_paciente,
        tipo_paciente: "registrado"
      }));
      
    } catch (err) {
      setFoundPatient(null);
      setFormData(prev => ({ 
        ...prev, 
        id_paciente: "",
        tipo_paciente: "espontaneo"
      }));
      setSearchError(err.message);
    } finally {
      setSearching(false);
    }
  };

  // Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipoPacienteChange = (tipo) => {
    setFormData(prev => ({
      ...prev,
      tipo_paciente: tipo,
      id_paciente: tipo === "registrado" ? prev.id_paciente : "",
      nombre_espontaneo: tipo === "espontaneo" ? prev.nombre_espontaneo : "",
      documento_espontaneo: tipo === "espontaneo" ? prev.documento_espontaneo : "",
      telefono_espontaneo: tipo === "espontaneo" ? prev.telefono_espontaneo : ""
    }));

    if (tipo === "registrado") {
      setFoundPatient(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Validaciones básicas
      if (!formData.fecha || !formData.motivo_cita) {
        throw new Error("Fecha y motivo de la cita son requeridos");
      }

      if (!modoEdicion && !formData.id_auxiliar) {
        throw new Error("Debe seleccionar un auxiliar");
      }

      // Validar tipo de paciente
      if (formData.tipo_paciente === "registrado" && !formData.id_paciente) {
        throw new Error("Debe buscar y seleccionar un paciente registrado");
      }

      if (formData.tipo_paciente === "espontaneo") {
        if (!formData.nombre_espontaneo.trim()) {
          throw new Error("Nombre es requerido para paciente espontáneo");
        }
        if (!formData.telefono_espontaneo.trim()) {
          throw new Error("Teléfono es requerido para paciente espontáneo");
        }
      }

      const selectedDate = new Date(formData.fecha);
      const now = new Date();
      
      if (selectedDate < now) {
        throw new Error("No puedes agendar citas en horas pasadas");
      }

      // Preparar datos para enviar
      const datosParaEnviar = {
        ...formData,
        fecha: formData.fecha,
        // Limpiar campos no necesarios según el tipo de paciente
        id_paciente: formData.tipo_paciente === "registrado" ? formData.id_paciente : null,
        nombre_espontaneo: formData.tipo_paciente === "espontaneo" ? formData.nombre_espontaneo : null,
        documento_espontaneo: formData.tipo_paciente === "espontaneo" ? formData.documento_espontaneo : null,
        telefono_espontaneo: formData.tipo_paciente === "espontaneo" ? formData.telefono_espontaneo : null
      };

      const token = localStorage.getItem("token");
      const url = modoEdicion 
        ? `http://localhost:3000/api/citas/${formData.id_cita}`
        : "http://localhost:3000/api/citas";
      
      const method = modoEdicion ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(datosParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al guardar cita");
      }

      onCitaCreada(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Selección de tipo de paciente (solo en creación) */}
      {!modoEdicion && (

        <SelectorTipoPaciente
          formData={formData}
          handleTipoPacienteChange={handleTipoPacienteChange}
          submitting={submitting}
        />        
      )}

      {/* Búsqueda de paciente registrado */}
      {!modoEdicion && formData.tipo_paciente === "registrado" && (
        <PacienteRegistrado
        documentoBusqueda={documentoBusqueda}
        setDocumentoBusqueda={setDocumentoBusqueda}
        handleSearchPatient={handleSearchPatient}
        searching={searching}
        submitting={submitting}
        searchError={searchError}
        foundPatient={foundPatient}
        />
      )}

      {/* Campos para paciente espontáneo */}
      {(formData.tipo_paciente === "espontaneo" || (modoEdicion && !formData.id_paciente)) && (
        <PacienteEspontaneo
          formData={formData}
          handleChange={handleChange}
          submitting={submitting}
          modoEdicion={modoEdicion}
        />
      )}

      {/* Modo edición: Mostrar info del paciente registrado */}
      {modoEdicion && formData.id_paciente && foundPatient && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-2">Información del Paciente</h3>
          <p className="text-gray-800">{foundPatient.nombre_completo}</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <p><span className="text-gray-600">Documento:</span> {foundPatient.documento_identidad}</p>
            <p><span className="text-gray-600">Teléfono:</span> {foundPatient.telefono}</p>
          </div>
        </div>
      )}

      {/* Selector de auxiliar (solo en creación) */}
      {!modoEdicion && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Doctora <span className="text-red-500">*</span>
          </label>
          <select
            name="id_auxiliar"
            value={formData.id_auxiliar}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={submitting}
          >
            <option value="">Seleccionar Doctora</option>
            {auxiliares.map((auxiliar) => (
              <option key={auxiliar.id_usuario} value={auxiliar.id_usuario}>
                {auxiliar.nombre} {auxiliar.apellido}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Motivo de la cita */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Motivo de la Cita <span className="text-red-500">*</span>
        </label>
        <textarea
          name="motivo_cita"
          value={formData.motivo_cita}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
          rows={3}
        />
      </div>

      {/* Fecha y hora */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Fecha y Hora <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
          min={modoEdicion ? undefined : formatForDateTimeInput(new Date().toISOString())}
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={submitting}
        >
          <option value="pendiente">Pendiente</option>
          <option value="atendida">Atendida</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Botones del formulario */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          disabled={submitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          disabled={submitting}
        >
          {submitting && <Spinner size="sm" white />}
          {modoEdicion ? "Actualizar Cita" : "Guardar Cita"}
        </button>
      </div>
    </form>
  );
};

export default FormularioCita;