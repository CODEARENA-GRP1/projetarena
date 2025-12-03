import "./Navbar.css";

export default function Navbar() {

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-left">
        CodeArena
      </div>

      {/* CENTER BUTTONS */}
      <ul className="navbar-center">
        <li onClick={() => scrollTo("Home")}>Accueil</li>
        <li onClick={() => scrollTo("mission")}>Mission</li>
        <li onClick={() => scrollTo("contact")}>Contact</li>
      </ul>

      {/* RIGHT BUTTONS */}
      <div className="navbar-right">
        <button className="btn-login">Se connecter</button>
        <button className="btn-register">S'inscrire</button>
      </div>
    </nav>
  );
}