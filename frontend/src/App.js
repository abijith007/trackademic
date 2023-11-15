import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/AboutUs/AboutUs';
import Issues from './components/Issues/Issues';


function App() {  
  axios.defaults.withCredentials = true;
  return (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />      
      <Route path="/signup" element={<Signup />} />      
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/issues" element={<Issues />} /> 
      <Route path="/about-us" element={<AboutUs />} />          
    </Routes>
  </Router>
  );
}

export default App;
