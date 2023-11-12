import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard';


function App() {  
  axios.defaults.withCredentials = true;
  return (
  <Router>
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<Login />} />      
      <Route path="/dashboard" element={<Dashboard />} />      
    </Routes>
  </Router>
  );
}

export default App;
