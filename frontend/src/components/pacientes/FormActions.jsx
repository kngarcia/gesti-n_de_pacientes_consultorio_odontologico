const FormActions = ({ isEditing, onCancel, onSave, loading }) => {
    if (!isEditing) return null;
  
    return (
      <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    );
  };
  
  export default FormActions;