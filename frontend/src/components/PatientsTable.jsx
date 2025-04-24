import React from "react";
import Spinner from "./Spinner";
const PatientsTable = ({ patients, onViewDetails, loading }) => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      );
    }
  
    return (
      <div className="mt-6 overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Cédula</th>
              <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-5 text-gray-500 italic">
                  No se encontraron pacientes
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id_paciente} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{patient.documento_identidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.nombre_completo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.edad}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.telefono}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails(patient.id_paciente)}
                      className="inline-flex items-center bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    );
  };
  
  export default PatientsTable; 