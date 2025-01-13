import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin'; 
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';

const App = () => {
  return (
   
      <Routes>
        <Route path="/Start" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} /> 
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    
  );
};

export default App;
