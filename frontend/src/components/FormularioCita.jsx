import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const FormularioCita = ({ 
  onCitaCreada, 
  onCancelar, 
  citaExistente, 
  modoEdicion = false 
}) => {
  const [pacientes, setPacientes] = useState([]);
  const [auxiliares, setAuxiliares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    id_paciente: "",
    id_auxiliar: "",
    fecha: "",
    estado: "pendiente"
  });

  // Función para formatear fecha para el input datetime-local
  const formatForDateTimeInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Ajustamos para mostrar la hora local correctamente
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
  };

  // Función para formatear fecha para enviar al backend
  const formatForBackend = (dateString) => {
    const date = new Date(dateString);
    // Convertimos a UTC manteniendo el mismo instante temporal
    return date.toISOString();
  };

  // Inicializar formulario
  useEffect(() => {
    if (citaExistente) {
      setFormData({
        id_cita: citaExistente.id_cita,
        id_paciente: citaExistente.id_paciente,
        id_auxiliar: citaExistente.id_auxiliar,
        fecha: formatForDateTimeInput(citaExistente.fecha),
        estado: citaExistente.estado
      });
    } else {
      // Establecer fecha mínima como hora actual en formato local
      const now = new Date();
      setFormData({
        id_paciente: "",
        id_auxiliar: "",
        fecha: formatForDateTimeInput(now.toISOString()),
        estado: "pendiente"
      });
    }
  }, [citaExistente]);

  // Obtener datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        const [pacientesRes, auxiliaresRes] = await Promise.all([
          fetch("http://localhost:3000/api/pacientes", {
            headers: { "Authorization": `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/api/usuarios?rol=auxiliar", {
            headers: { "Authorization": `Bearer ${token}` },
          })
        ]);

        if (!pacientesRes.ok || !auxiliaresRes.ok) {
          throw new Error("Error al cargar datos");
        }

        const [pacientesData, auxiliaresData] = await Promise.all([
          pacientesRes.json(),
          auxiliaresRes.json()
        ]);

        setPacientes(pacientesData);
        setAuxiliares(auxiliaresData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Validación básica
      if (!formData.id_paciente || !formData.id_auxiliar || !formData.fecha) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      // Validación de fecha/hora
      const selectedDate = new Date(formData.fecha);
      const now = new Date();
      
      if (selectedDate < now) {
        throw new Error("No puedes agendar citas en horas pasadas");
      }

      // Preparar datos para enviar al backend
      const datosParaEnviar = {
        ...formData,
        fecha: formatForBackend(formData.fecha)
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

      <div>
        <label className="block text-sm font-medium mb-1">
          Paciente <span className="text-red-500">*</span>
        </label>
        <select
          name="id_paciente"
          value={formData.id_paciente}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
        >
          <option value="">Seleccionar paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id_paciente} value={paciente.id_paciente}>
              {paciente.nombre_completo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Auxiliar <span className="text-red-500">*</span>
        </label>
        <select
          name="id_auxiliar"
          value={formData.id_auxiliar}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={submitting}
        >
          <option value="">Seleccionar auxiliar</option>
          {auxiliares.map((auxiliar) => (
            <option key={auxiliar.id_usuario} value={auxiliar.id_usuario}>
              {auxiliar.nombre} {auxiliar.apellido}
            </option>
          ))}
        </select>
      </div>

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
          min={formatForDateTimeInput(new Date().toISOString())}
        />
      </div>

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