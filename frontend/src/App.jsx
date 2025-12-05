import { Routes, Route } from "react-router-dom";

import HomePublic from "./pages/HomePublic.jsx";
import HomePrivate from "./pages/HomePrivate.jsx";

import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePublic />} />
      <Route path="/home" element={<HomePrivate />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
