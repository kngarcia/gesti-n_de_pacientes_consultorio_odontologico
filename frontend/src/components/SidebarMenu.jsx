import React from 'react';

const SidebarMenu = ({ currentView, onChangeView, onLogout }) => {
  return (
    <aside className="w-64 bg-blue-800 text-white p-6">
      <h2 className="text-2xl font-bold">Menú</h2>
      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <button 
              onClick={() => onChangeView("pacientes")} 
              className={`block p-2 hover:bg-blue-700 rounded w-full text-left ${currentView === "pacientes" ? 'bg-blue-600' : ''}`}
            >
              🏥 Pacientes
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={() => onChangeView("agenda")} 
              className={`block p-2 hover:bg-blue-700 rounded w-full text-left ${currentView === "agenda" ? 'bg-blue-600' : ''}`}
            >
              🗓️ Agenda
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={() => onChangeView("logout")} 
              className="block p-2 hover:bg-red-600 rounded w-full text-left"
            >
              🚪 Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarMenu;