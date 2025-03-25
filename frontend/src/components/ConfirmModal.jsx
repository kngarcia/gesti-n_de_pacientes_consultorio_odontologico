const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar"
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-white/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div className="p-4">
            <p>{message}</p>
          </div>
          <div className="p-4 border-t flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;