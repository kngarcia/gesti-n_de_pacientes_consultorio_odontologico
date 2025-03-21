import { useState } from "react";

const Dashboard = () => {
  const [view, setView] = useState("pacientes"); // Controla qué vista mostrar
  const [patients, setPatients] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Menú lateral */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold">Menú</h2>
        <nav className="mt-6">
          <ul>
            <li className="mb-4">
              <button onClick={() => setView("pacientes")} className="block p-2 hover:bg-blue-700 rounded w-full text-left">
                🏥 Pacientes
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setView("agenda")} className="block p-2 hover:bg-blue-700 rounded w-full text-left">
                🗓️ Agenda
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setView("logout")} className="block p-2 hover:bg-red-600 rounded w-full text-left">
                🚪 Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {view === "pacientes" && (
            <>
              <h2 className="text-2xl font-bold text-gray-700">Pacientes</h2>

              {/* Barra de búsqueda */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Cédula del paciente"
                  className="border p-2 rounded-lg w-full"
                />
                <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Buscar paciente
                </button>
              </div>

              {/* Tabla de pacientes */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-3 text-left">Cédula</th>
                      <th className="p-3 text-left">Nombres</th>
                      <th className="p-3 text-left">Apellidos</th>
                      <th className="p-3 text-left">Fecha de registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                          No hay pacientes registrados
                        </td>
                      </tr>
                    ) : (
                      patients.map((patient, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{patient.cedula}</td>
                          <td className="p-3">{patient.nombres}</td>
                          <td className="p-3">{patient.apellidos}</td>
                          <td className="p-3">{patient.fechaRegistro}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Botón para agregar pacientes */}
              <div className="mt-6 text-center">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
                  Crear nuevo paciente
                </button>
              </div>
            </>
          )}

          {view === "agenda" && (
            <>
              <h2 className="text-2xl font-bold text-gray-700">Agenda</h2>
              <p>Aquí puedes ver la agenda de citas médicas.</p>
            </>
          )}

          {view === "logout" && (
            <>
              <h2 className="text-2xl font-bold text-gray-700">Cerrar sesión</h2>
              <p>¿Estás seguro de que deseas cerrar sesión?</p>
              <button className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
                Confirmar salida
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;