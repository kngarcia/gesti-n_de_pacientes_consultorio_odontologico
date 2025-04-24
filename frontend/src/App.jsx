import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientDetails from './components/pacientes/PatientDetails';
import HistoriaClinicaLayout from './components/historia-clinica/HistoriaClinicaLayout';
import Spinner from './components/Spinner';
import { lazy, Suspense } from 'react';

// Carga diferida para mejor performance
const LazyAntecedentes = lazy(() => import('./components/historia-clinica/modulos/Antecedentes'));
const LazyFrecuenciaCepillado = lazy(() => import('./components/historia-clinica/modulos/FrecuenciaCepillado'));
const LazyExamenClinico = lazy(() => import('./components/historia-clinica/modulos/ExamenClinico'));
const LazyExamenEstomatologico = lazy(() => import('./components/historia-clinica/modulos/ExamenEstomatologico'));
const LazyDiagnosticoGeneral = lazy(() => import('./components/historia-clinica/modulos/DiagnosticoGeneral'));
const LazyPronosticoGeneral = lazy(() => import('./components/historia-clinica/modulos/PronosticoGeneral'));
function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner fullScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} 
      />
      
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} 
      />
      
      <Route 
        path="/pacientes/:patientId" 
        element={isAuthenticated ? <PatientDetails /> : <Navigate to="/" replace />} 
      />
      
      {/* Ruta anidada para historia clínica */}
      <Route 
        path="/pacientes/:patientId/historia-clinica" 
        element={isAuthenticated ? <HistoriaClinicaLayout /> : <Navigate to="/" replace />}
      >
        <Route index element={<Navigate to="antecedentes" replace />} />
        <Route 
          path="antecedentes" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyAntecedentes />
            </Suspense>
          } 
        />
        <Route 
          path="frecuencia-cepillado" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyFrecuenciaCepillado />
            </Suspense>
          }
        />
        <Route 
          path="examen-clinico" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyExamenClinico />
            </Suspense>
          }
        />
        <Route 
          path="examen-estomatologico" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyExamenEstomatologico />
            </Suspense>
          }
        />
        <Route 
          path="diagnostico-general" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDiagnosticoGeneral />
            </Suspense>
          }
        />
        <Route 
          path="pronostico-general" 
          element={
            <Suspense fallback={<Spinner />}>
              <LazyPronosticoGeneral />
            </Suspense>
          }
        />
      </Route>


      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} 
      />
    </Routes>
  );
}

export default App;