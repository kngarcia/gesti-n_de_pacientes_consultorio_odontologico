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
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left">Cédula</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Edad</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No se encontraron pacientes
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id_paciente} className="border-t hover:bg-gray-50">
                  <td className="p-3">{patient.documento_identidad}</td>
                  <td className="p-3">{patient.nombre_completo}</td>
                  <td className="p-3">{patient.edad}</td>
                  <td className="p-3">{patient.telefono}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onViewDetails(patient.id_paciente)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                    >
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