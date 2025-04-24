import Spinner from "../Spinner";
export const PacienteRegistrado = ({ 
    documentoBusqueda, 
    setDocumentoBusqueda, 
    handleSearchPatient, 
    searching, 
    submitting, 
    searchError, 
    foundPatient 
  }) => (
    <div>
      <label className="block text-sm font-medium mb-1">
        Buscar Paciente por Documento <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ingrese documento completo"
          value={documentoBusqueda}
          onChange={(e) => setDocumentoBusqueda(e.target.value)}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={submitting}
        />
        <button
          type="button"
          onClick={handleSearchPatient}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          disabled={submitting || !documentoBusqueda.trim()}
        >
          {searching ? <Spinner size="sm" white className="mr-2" /> : null}
          Buscar
        </button>
      </div>
      
      {searchError && (
        <p className="mt-1 text-sm text-red-600">{searchError}</p>
      )}
      
      {foundPatient && (
        <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
          <p className="font-medium text-gray-800">{foundPatient.nombre_completo}</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <p><span className="text-gray-600">Documento:</span> {foundPatient.documento_identidad}</p>
            <p><span className="text-gray-600">Teléfono:</span> {foundPatient.telefono}</p>
            <p><span className="text-gray-600">Edad:</span> {foundPatient.edad}</p>
            <p><span className="text-gray-600">EPS:</span> {foundPatient.eps}</p>
          </div>
        </div>
      )}
    </div>
  );