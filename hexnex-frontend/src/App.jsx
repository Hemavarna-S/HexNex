import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import StudentDashboard from './dashboard/StudentDashboard';
import LandingPage from './pages/LandingPage';
import Rooms from './pages/Rooms';
import AIBotChat from './components/AIBotChat';

// Individual simulation rooms
import PhishingRoom from './pages/rooms/PhishingRoom';
import MITMRoom from './pages/rooms/MITMRoom';
import BruteForceRoom from './pages/rooms/BruteForceRoom';
import SocialEngineeringRoom from './pages/rooms/SocialEngineeringRoom';
import MalwareRoom from './pages/rooms/MalwareRoom';

// Fake vault pages (where creds are hidden)
import VaultLoginPage from './pages/VaultLoginPage';
import PortalPage from './pages/PortalPage';
import HiddenAdminPage from './pages/HiddenAdminPage';
import SSHInfoPage from './pages/SSHInfoPage';
import EncryptedFilePage from './pages/EncryptedFilePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem('token')
  );

  React.useEffect(() => {
    const onAuthChange = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('authChanged', onAuthChange);
    return () => window.removeEventListener('authChanged', onAuthChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/student-dashboard"
          element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms"
          element={isAuthenticated ? <Rooms /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms/phishing"
          element={isAuthenticated ? <PhishingRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms/mitm"
          element={isAuthenticated ? <MITMRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms/brute-force"
          element={isAuthenticated ? <BruteForceRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms/social-engineering"
          element={isAuthenticated ? <SocialEngineeringRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/rooms/malware"
          element={isAuthenticated ? <MalwareRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/progress"
          element={isAuthenticated ? <div>Progress page</div> : <Navigate to="/login" />}
        />
        <Route
          path="/hexnexai"
          element={isAuthenticated ? <AIBotChat /> : <Navigate to="/login" />}
        />

        {/* Fake vault pages */}
        <Route path="/vault-login" element={<VaultLoginPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/ssh-info" element={<SSHInfoPage />} />
        <Route path="/hidden-admin" element={<HiddenAdminPage />} />
        <Route path="/encrypted-file" element={<EncryptedFilePage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
