const PatientHeader = ({
  onBack,
  onEdit,
  onDelete,
  isEditing,
  onHistoryClick,  // Nuevo prop unificado
  hasHistory
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
    <button 
      onClick={onBack}
      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      Volver a la lista
    </button>

    <div className="flex flex-wrap gap-3">
      {!isEditing && (
        <>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar
          </button>

          {/* Botón unificado para historia clínica */}
          <button
            onClick={onHistoryClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasHistory 
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              {hasHistory ? (
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 8.25V5a.75.75 0 00-1.5 0v5a.75.75 0 00.22.53l3 3a.75.75 0 101.06-1.06l-2.78-2.72z" />
              ) : (
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              )}
            </svg>
            {hasHistory ? 'Ver Historia' : 'Crear Historia'}
          </button>
        </>
      )}

      <button
        onClick={onDelete}
        className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Eliminar
      </button>
    </div>
  </div>
);

export default PatientHeader;