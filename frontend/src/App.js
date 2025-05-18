
 

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

import PremiumCallback from './components/PremiumCallback';
import SignInPage from './pages/SignInPage.js'; // Fixed import path and filename with correct case
import LoginPage from './pages/LoginPage.js';
import SendEmail from './pages/SendEmailPage.js';
import ResetPasswordPage from './pages/ResetPasswordPage.js';
import LeaderDashboard from './pages/leadDashboardPage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/premium.css';
import './styles/dashboard.css';
import './styles/leadDashboard.css';
//import './styles/Reports.css'

// Simple authentication check
const isAuthenticated = () => {
  return localStorage.getItem('token') ? true : false;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/register" element={<SignInPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sendemail" element={<SendEmail/>} />
        <Route path="/verify/:token" element={<ResetPasswordPage/>} />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/leaderdashboard" element={  
          <ProtectedRoute>
            <LeaderDashboard/> 
          </ProtectedRoute>
        } />

        <Route path="/premium-callback" element={
          <ProtectedRoute>

          <PremiumCallback /> 

           

          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
 
