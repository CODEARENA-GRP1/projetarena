import { Routes, Route } from "react-router-dom";

import HomePublic from "./pages/HomePublic";
import HomePrivate from "./pages/HomePrivate";

import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Defis from "./pages/Defis"; // <---- AJOUT ICI

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePublic />} />
      <Route path="/home" element={<HomePrivate />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/defis" element={<Defis />} /> {/* <---- AJOUT ICI */}

      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
