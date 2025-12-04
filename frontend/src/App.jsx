import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';   // <-- ajouter
import Home from './pages/Home';
import Contact from './pages/Contact';
import Defis from './pages/Defis';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <>
      <Navbar />   {/* <-- NAVBAR TOUJOURS AFFICHÉE */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/defis" element={<Defis />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
