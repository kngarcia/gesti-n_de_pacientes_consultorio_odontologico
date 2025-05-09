import { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importar el ícono

const HistoriaLayout = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Definición de las pestañas disponibles
  const tabs = [
    { label: 'Antecedentes', path: 'antecedentes' },
    { label: 'Frecuencia Cepillado', path: 'frecuencia-cepillado' },
    { label: 'Examen Clinico', path: 'examen-clinico' },
    { label: 'Odontograma', path: 'odontograma' },
    { label: 'Examen Estomatologico', path: 'examen-estomatologico' },
    { label: 'Diagnostico General', path: 'diagnostico-general' },
    { label: 'Pronostico General', path: 'pronostico-general' },
    { label: 'Oclusion y ATM', path: 'oclusion-atm' },

  ];

  // Sincronizar la pestaña activa con la URL
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const historiaIndex = pathSegments.indexOf('historia-clinica');
    
    if (historiaIndex !== -1 && pathSegments.length > historiaIndex + 1) {
      const currentTabPath = pathSegments[historiaIndex + 1];
      const currentTabIndex = tabs.findIndex(tab => tab.path === currentTabPath);
      if (currentTabIndex !== -1) setActiveTab(currentTabIndex);
    }
  }, [location]);

  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(`/pacientes/${patientId}/historia-clinica/${tabs[newValue].path}`);
  };

  // Navegar a detalles del paciente
  const handleBackToPatient = () => {
    navigate(`/pacientes/${patientId}`);
  };

  return (
    <div className="p-4">
      {/* Botón de regreso y título */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={handleBackToPatient}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowBackIcon className="w-5 h-5" />
          <span>Volver al paciente</span>
        </button>
        <h2 className="text-2xl font-bold">Historia Clínica</h2>
      </div>

      {/* Barra de pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Pestañas de historia clínica"
        >
          {tabs.map((tab) => (
            <Tab 
              key={tab.path}
              label={tab.label}
              id={`tab-${tab.path}`}
              aria-controls={`tabpanel-${tab.path}`}
            />
          ))}
        </Tabs>

      </Box>

      {/* Contenido del submódulo activo */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HistoriaLayout;