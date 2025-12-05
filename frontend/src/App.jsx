import { Routes, Route } from "react-router-dom";

import HomePublic from "./pages/HomePublic";
import HomePrivate from "./pages/HomePrivate";

import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      {/* Home avant connexion */}
      <Route path="/" element={<HomePublic />} />

      {/* Home après connexion */}
      <Route path="/home" element={<HomePrivate />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User pages */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
