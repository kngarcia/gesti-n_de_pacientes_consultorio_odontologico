import { useState, useEffect, useMemo } from "react";
import FormularioCita from "./FormularioCita";
import Modal from "../Modal";
import Spinner from "../Spinner";
import ConfirmModal from "../ConfirmModal";
import Pagination from "../Pagination";

const Agenda = () => {
  const [citas, setCitas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [citaACancelar, setCitaACancelar] = useState(null);
  const [citaAEditar, setCitaAEditar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Obtener citas
  const fetchCitas = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/citas", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Error al obtener citas");
      
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

  // Citas filtradas y ordenadas
  const citasFiltradas = useMemo(() => {
    let filtered = [...citas];
  
    if (filtroFecha) {
      filtered = filtered.filter(cita => {
        const fechaCita = new Date(cita.fecha).toISOString().split("T")[0];
        const fechaFiltro = new Date(filtroFecha).toISOString().split("T")[0];
        return fechaCita === fechaFiltro;
      });
    }
  
    if (filtroPaciente) {
      filtered = filtered.filter(cita => {
        const nombrePaciente = cita.id_paciente 
          ? cita.Paciente?.nombre_completo?.toLowerCase() 
          : cita.nombre_espontaneo?.toLowerCase();
        return nombrePaciente?.includes(filtroPaciente.toLowerCase());
      });
    }
  
    return filtered.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }, [citas, filtroFecha, filtroPaciente]);

  // Citas para la página actual
  const citasPaginaActual = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return citasFiltradas.slice(startIndex, startIndex + itemsPerPage);
  }, [citasFiltradas, currentPage, itemsPerPage]);

  // Resetear página al filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [filtroFecha, filtroPaciente, itemsPerPage]);

  // Funciones para manejar citas
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

  // Formateadores
  const formatFechaLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatHoraLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace("AM", "a. m.").replace("PM", "p. m.");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Agenda de Citas</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Filtros */}
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
          <div className="mt-6 overflow-x-auto max-w-7xl mx-auto rounded-lg shadow-md bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Paciente</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Documento</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Teléfono</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Hora</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Motivo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {citasPaginaActual.map((cita) => (
                  <tr key={cita.id_cita} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      {cita.id_paciente ? cita.Paciente?.nombre_completo : cita.nombre_espontaneo}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {cita.id_paciente ? cita.Paciente?.documento_identidad : cita.documento_espontaneo || '-'}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {cita.id_paciente ? cita.Paciente?.telefono : cita.telefono_espontaneo}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatFechaLocal(cita.fecha)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatHoraLocal(cita.fecha)}</td>
                    <td className="px-4 py-3 max-w-[180px] truncate hover:whitespace-normal hover:max-w-none">
                      {cita.motivo_cita}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border 
                        ${cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          cita.estado === 'atendida' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-red-100 text-red-800 border-red-200'}`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEditarCita(cita.id_cita)}
                        className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setCitaACancelar(cita.id_cita)}
                        disabled={cita.estado === 'cancelada'}
                        className={`text-sm px-3 py-1.5 rounded-lg transition-colors
                          ${cita.estado === 'cancelada'
                            ? 'bg-gray-300 text-white cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'}`}
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

          {/* Paginación y contador */}
          {citasFiltradas.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <div className="text-sm text-gray-600">
                Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, citasFiltradas.length)}-
                {Math.min(currentPage * itemsPerPage, citasFiltradas.length)} de {citasFiltradas.length} citas
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Mostrar:</span>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border rounded p-1 text-sm"
                  >
                    {[5, 10, 20, 50].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <Pagination
                  totalItems={citasFiltradas.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  maxVisiblePages={5}
                />
              </div>
            </div>
          )}
        </>
      )}

      <button
        onClick={() => setMostrarFormulario(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 mt-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Agregar nueva cita
      </button>

      {/* Modales */}
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
        title={`Editar Cita - ${
          citaAEditar?.id_paciente 
            ? citaAEditar.Paciente?.nombre_completo 
            : citaAEditar?.nombre_espontaneo || ''
        }`}
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