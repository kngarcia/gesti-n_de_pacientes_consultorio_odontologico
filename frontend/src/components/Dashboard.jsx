import { useState, useEffect } from "react";
import RegisterPatient from "./RegisterPatient";
import Agenda from "./Agenda";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import SidebarMenu from "./SidebarMenu";
import PatientsTable from "./PatientsTable";
import Pagination from "./Pagination";
import LogoutConfirmation from "./LogoutConfirmation";
import PatientDetails from "./PatientDetails";

const Dashboard = () => {
  const [view, setView] = useState("pacientes");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const [selectedPatient, setSelectedPatient] = useState(null); // Estado para el paciente seleccionado

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/pacientes", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Error al obtener pacientes");
      
      const data = await response.json();
      setPatients(data);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filtrar pacientes basado en el término de búsqueda
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.documento_identidad.includes(searchTerm) ||
      patient.nombre_completo.toLowerCase().includes(searchLower) ||
      patient.telefono.includes(searchTerm)
    );
  });

  // Calcular pacientes para la página actual
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Función para manejar el clic en "Ver detalles"
  const handleViewDetails = (id) => {
    setSelectedPatient(id);
  };

  // Función para volver a la lista
  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  // Función para manejar actualización exitosa
  const handlePatientUpdated = () => {
    fetchPatients(); // Refrescar la lista
    setSelectedPatient(null); // Opcional: volver a la lista
  };

  // Función para manejar eliminación exitosa
  const handlePatientDeleted = () => {
    fetchPatients(); // Refrescar la lista
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu 
        currentView={view}
        onChangeView={(newView) => {
          setView(newView);
          setSelectedPatient(null); // Resetear al cambiar de vista
        }}
        onLogout={() => setView("logout")}
      />

      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading && <Spinner />}
          {error && <ErrorMessage message={error} onRetry={fetchPatients} />}

          {/* Vista de Pacientes */}
          {view === "pacientes" && !selectedPatient && (
            <>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Pacientes</h2>

              <div className="mt-4 flex items-center">
                <input 
                  type="text" 
                  placeholder="Buscar por cédula, nombre o teléfono" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-lg w-full" 
                />
                <button
                  onClick={fetchPatients}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Refrescar
                </button>
              </div>

              <PatientsTable 
                patients={currentPatients}
                onViewDetails={handleViewDetails} // Pasamos la función actualizada
                loading={loading}
              />

              {filteredPatients.length > patientsPerPage && (
                <Pagination
                  totalItems={filteredPatients.length}
                  itemsPerPage={patientsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setView("register")}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                  Crear nuevo paciente
                </button>
              </div>
            </>
          )}

          {/* Vista de Detalles del Paciente */}
          {view === "pacientes" && selectedPatient && (
            <PatientDetails 
              patientId={selectedPatient}
              onBack={handleBackToList}
              onPatientUpdated={handlePatientUpdated}
              onPatientDeleted={handlePatientDeleted}
            />
          )}

          {/* Vista de Registro de Paciente */}
          {view === "register" && (
            <RegisterPatient 
              onBack={() => {
                setView("pacientes");
                fetchPatients();
              }} 
            />
          )}

          {/* Vista de Agenda */}
          {view === "agenda" && <Agenda />}

          {/* Vista de Cierre de Sesión */}
          {view === "logout" && (
            <LogoutConfirmation 
              onConfirm={handleLogout}
              onCancel={() => setView("pacientes")}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;