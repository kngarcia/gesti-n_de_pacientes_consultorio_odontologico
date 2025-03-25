import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Error</p>
          <p>{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;