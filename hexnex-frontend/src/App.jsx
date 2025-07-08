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

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route: Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/login" />}
        />

        {/* Protected route: Main Simulation Room Selector */}
        <Route
          path="/rooms"
          element={isAuthenticated ? <Rooms /> : <Navigate to="/login" />}
        />

        {/* Protected routes: Individual simulation labs */}
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

        {/* Protected routes: Additional pages */}
        <Route path="/progress" element={isAuthenticated ? <div /> : <Navigate to="/login" />} />
        <Route path="/hexnexai" element={isAuthenticated ? <AIBotChat /> : <Navigate to="/login" />} />

        {/* Redirect all unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
