// src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/AboutUs/AboutUs';
import Issues from './components/Issues/Issues';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  // ...other code...

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/issues" element={
          <ProtectedRoute>
            <Issues />
          </ProtectedRoute>
        } />
        <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
