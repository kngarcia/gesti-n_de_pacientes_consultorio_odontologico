import { useState, useEffect } from "react";
import FormularioCita from "./FormularioCita"; // Importar el nuevo componente

const Agenda = () => {
  const [citas, setCitas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario

  // Obtener citas (ya existente)
  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/citas", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setCitas(data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  // Filtrar citas (ya existente)
  const citasFiltradas = citas.filter((cita) => {
    const coincideFecha = filtroFecha ? cita.fecha.includes(filtroFecha) : true;
    const coincidePaciente = filtroPaciente
      ? cita.Paciente.nombre_completo.toLowerCase().includes(filtroPaciente.toLowerCase())
      : true;
    return coincideFecha && coincidePaciente;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Agenda de Citas</h2>

      {/* Botón para agregar nueva cita */}
      <div className="mb-4">
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Agregar nueva cita
        </button>
      </div>

      {/* Mostrar formulario en un modal o sección */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <FormularioCita
              onCitaCreada={() => {
                fetchCitas(); // Refrescar la lista
                setMostrarFormulario(false); // Cerrar el formulario
              }}
              onCancelar={() => setMostrarFormulario(false)}
            />
          </div>
        </div>
      )}

      {/* Resto del código (filtros y tabla) */}
      <div className="mb-4 flex gap-4">
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Buscar por paciente"
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg flex-1"
        />
      </div>

      {/* Tabla de citas (ya existente) */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* ... (código de la tabla) ... */}
        </table>
      </div>
    </div>
  );
};

export default Agenda;