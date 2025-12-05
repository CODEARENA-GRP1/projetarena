import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavbarPrivate() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <img src="/logo.png" alt="logo" className="logo" />
        <span className="brand-name">CodeArena</span>
      </div>

      <ul className="navbar-center">
        <li>Accueil</li>
        <li>Mission</li>
        <li>Contact</li>
      </ul>

      <div className="navbar-right">

        <div
          className="profile-container"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img src="/avatar.jpg" className="profile-avatar" alt="profil" />
        </div>

        {openMenu && (
          <div className="profile-menu">
            <Link to="/profile">Profil</Link>
            <Link to="/settings">Paramètres</Link>
            <Link to="/login">Déconnexion</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
