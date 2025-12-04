import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      
      {/* LEFT SIDE — Logo + Name */}
      <div className="navbar-left">
        <img src="/logo.png" alt="logo" className="logo" />
        <span className="brand-name">CodeArena</span>
      </div>

      {/* CENTER LINKS */}
      <ul className="navbar-center">
        <li>Accueil</li>
        <li>Mission</li>
        <li>Contact</li>
      </ul>

      {/* RIGHT BUTTONS */}
      <div className="navbar-right">
        <Link to="/login" className="btn-login">Se connecter</Link>
        <Link to="/register" className="btn-register">S'inscrire</Link>
      </div>

    </nav>
  );
}
