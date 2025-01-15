import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin'; 
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import Home from './pages/Home';
import UserLogout from './pages/UserLogout';
import CaptainLogout from './pages/CaptainLogout';
import CaptainHome from './pages/CaptainHome';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectedWrapper><Home /></UserProtectedWrapper>
        } />
         <Route path="/Captain-Home" element={<CaptainHome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} /> 
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path='/user/logout' element={
          <UserProtectedWrapper><UserLogout /></UserProtectedWrapper>
        } />
         <Route path='/captain/logout' element={
          <UserProtectedWrapper><CaptainLogout /></UserProtectedWrapper>
        } />
      </Routes>
   
  );
};

export default App;