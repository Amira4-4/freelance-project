import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import { LoadingSpinner } from './components/ui/Modal';

// Code-split pages for high performance and fast initial bundle
const Home = lazy(() => import('./pages/Home'));
const ExploreEngineers = lazy(() => import('./pages/ExploreEngineers'));
const BrowseProjects = lazy(() => import('./pages/BrowseProjects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const RoleSelection = lazy(() => import('./pages/RoleSelection'));
const EngineerRegister = lazy(() => import('./pages/EngineerRegister'));
const EngineerRegisterSuccess = lazy(() => import('./pages/EngineerRegisterSuccess'));
const ClientRegister = lazy(() => import('./pages/ClientRegister'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const EngineerProfile = lazy(() => import('./pages/EngineerProfile'));

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div key={location.pathname} className="page-enter">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-brand-bg dark:bg-brand-darkBg">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/engineers" element={<ExploreEngineers />} />
            <Route path="/projects" element={<BrowseProjects />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/register" element={<RoleSelection />} />
            <Route path="/register/engineer" element={<EngineerRegister />} />
            <Route path="/register/engineer/success" element={<EngineerRegisterSuccess />} />
            <Route path="/register/client" element={<ClientRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/engineer/:id" element={<EngineerProfile />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
