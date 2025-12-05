import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>

      <nav className="sidebar-menu">
        <Link to="/home" className={isActive("/home")}>
          🏠 Accueil
        </Link>

        <Link to="/defis" className={isActive("/defis")}>
          📝 Défis
        </Link>

        <Link to="/profile" className={isActive("/profile")}>
          👤 Profil
        </Link>

        <Link to="/settings" className={isActive("/settings")}>
          ⚙️ Paramètres
        </Link>
      </nav>
    </div>
  );
}
