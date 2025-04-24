import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterPatient from "./RegisterPatient";
import Agenda from "./citas/Agenda";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import SidebarMenu from "./SidebarMenu";
import PatientsTable from "./PatientsTable";
import Pagination from "./Pagination";
import LogoutConfirmation from "./LogoutConfirmation";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [view, setView] = useState("pacientes");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/pacientes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener pacientes");

      const data = await response.json();
      setPatients(data);
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

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.documento_identidad.includes(searchTerm) ||
      patient.nombre_completo.toLowerCase().includes(searchLower) ||
      patient.telefono.includes(searchTerm)
    );
  });

  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleViewDetails = (id) => {
    navigate(`/pacientes/${id}`);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-blue-800 text-white transition-all duration-300`}>
        <SidebarMenu
          currentView={view}
          onChangeView={setView}
          onLogout={() => setView("logout")}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl w-full max-w-full">
          {/* Mobile Sidebar Toggle */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden mb-4 p-2 bg-blue-100 rounded-lg text-blue-800"
          >
            {sidebarCollapsed ? '>' : '<'}
          </button>

          {loading && <Spinner />}
          {error && <ErrorMessage message={error} onRetry={fetchPatients} />}

          {/* Patients View */}
          {view === "pacientes" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Pacientes</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 md:p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <svg className="absolute left-3 top-2.5 md:top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={fetchPatients}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="hidden sm:inline">Refrescar</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <PatientsTable
                  patients={currentPatients}
                  onViewDetails={handleViewDetails}
                  loading={loading}
                />
              </div>

              {filteredPatients.length > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                  <div className="text-sm text-gray-600">
                    Mostrando {indexOfFirstPatient + 1}-{Math.min(indexOfLastPatient, filteredPatients.length)} de {filteredPatients.length}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
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
                      totalItems={filteredPatients.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setView("register")}
                  className="flex items-center justify-center gap-2 mx-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo paciente
                </button>
              </div>
            </>
          )}

          {/* Register Patient View */}
          {view === "register" && (
            <RegisterPatient
              onBack={() => {
                setView("pacientes");
                fetchPatients();
              }}
            />
          )}

          {/* Agenda View */}
          {view === "agenda" && (
            <div className="w-full overflow-x-auto">
              <Agenda />
            </div>
          )}

          {/* Logout View */}
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