import { useState, useEffect, useMemo } from "react";
import FormularioCita from "./FormularioCita";
import Modal from "./Modal";
import Spinner from "./Spinner";
import ConfirmModal from "./ConfirmModal";

const Agenda = () => {
  const [citas, setCitas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [citaACancelar, setCitaACancelar] = useState(null);
  const [citaAEditar, setCitaAEditar] = useState(null);

  // Obtener citas con manejo de estado
  const fetchCitas = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/citas", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error("Error al obtener citas");
      }
      
      const data = await response.json();
      setCitas(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      setCitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
    
    const interval = setInterval(fetchCitas, 30000);
    return () => clearInterval(interval);
  }, []);

  // Citas filtradas y ordenadas con useMemo
  const citasFiltradas = useMemo(() => {
    let filtered = [...citas];
    
    if (filtroFecha) {
      filtered = filtered.filter(cita => {
        const fechaCita = new Date(cita.fecha);
        const fechaFiltro = new Date(filtroFecha);
        return (
          fechaCita.getFullYear() === fechaFiltro.getFullYear() &&
          fechaCita.getMonth() === fechaFiltro.getMonth() &&
          fechaCita.getDate() === fechaFiltro.getDate()
        );
      });
    }
    
    if (filtroPaciente) {
      filtered = filtered.filter(cita => 
        cita.Paciente.nombre_completo.toLowerCase().includes(filtroPaciente.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }, [citas, filtroFecha, filtroPaciente]);

  const handleCancelarCita = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/citas/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchCitas();
    } catch (error) {
      console.error("Error al cancelar cita:", error);
      setError("No se pudo cancelar la cita");
    } finally {
      setCitaACancelar(null);
    }
  };

  const handleEditarCita = (id) => {
    const cita = citas.find(c => c.id_cita === id);
    setCitaAEditar(cita);
  };

  const handleActualizarCita = async (citaActualizada) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/citas/${citaActualizada.id_cita}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(citaActualizada)
      });

      if (!response.ok) throw new Error("Error al actualizar cita");

      fetchCitas();
      setCitaAEditar(null);
    } catch (error) {
      console.error("Error al actualizar cita:", error);
      setError("No se pudo actualizar la cita");
    }
  };

  const resetFiltros = () => {
    setFiltroFecha("");
    setFiltroPaciente("");
  };

  // Función para formatear fecha sin cambios de zona horaria
  const formatFechaLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Función para formatear hora sin cambios de zona horaria
  const formatHoraLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Agenda de Citas</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Paciente</label>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtroPaciente}
            onChange={(e) => setFiltroPaciente(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        
        <button
          onClick={resetFiltros}
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Limpiar filtros
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3 text-left">Paciente</th>
                  <th className="p-3 text-left">Fecha</th>
                  <th className="p-3 text-left">Hora</th>
                  <th className="p-3 text-left">Estado</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citasFiltradas.map((cita) => (
                  <tr key={cita.id_cita} className="border-t hover:bg-gray-50">
                    <td className="p-3">{cita.Paciente.nombre_completo}</td>
                    <td className="p-3">{formatFechaLocal(cita.fecha)}</td>
                    <td className="p-3">{formatHoraLocal(cita.fecha)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        cita.estado === 'atendida' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEditarCita(cita.id_cita)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setCitaACancelar(cita.id_cita)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        disabled={cita.estado === 'cancelada'}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {citasFiltradas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filtroFecha || filtroPaciente ? (
                <>No se encontraron citas con los filtros actuales</>
              ) : (
                <>No hay citas programadas</>
              )}
            </div>
          )}
        </>
      )}

      <button
        onClick={() => setMostrarFormulario(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Agregar nueva cita
      </button>

      <Modal
        isOpen={mostrarFormulario}
        onClose={() => setMostrarFormulario(false)}
        title="Nueva Cita"
      >
        <FormularioCita
          onCitaCreada={() => {
            fetchCitas();
            setMostrarFormulario(false);
          }}
          onCancelar={() => setMostrarFormulario(false)}
        />
      </Modal>

      <Modal
        isOpen={!!citaAEditar}
        onClose={() => setCitaAEditar(null)}
        title={`Editar Cita - ${citaAEditar?.Paciente?.nombre_completo || ''}`}
      >
        <FormularioCita
          citaExistente={citaAEditar}
          onCitaCreada={handleActualizarCita}
          onCancelar={() => setCitaAEditar(null)}
          modoEdicion={true}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!citaACancelar}
        onClose={() => setCitaACancelar(null)}
        onConfirm={() => handleCancelarCita(citaACancelar)}
        title="Cancelar Cita"
        message="¿Estás seguro de que deseas cancelar esta cita?"
        confirmText="Sí, cancelar"
        cancelText="No, volver"
      />
    </div>
  );
};

export default Agenda;