import { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';

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
    { label: 'Examen Estomatologico', path: 'examen-estomatologico' },
    { label: 'Diagnostico General', path: 'diagnostico-general' },
    { label: 'Pronostico General', path: 'pronostico-general' },
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historia Clínica</h2>
      
      {/* Barra de pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
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