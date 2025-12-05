import NavbarPrivate from "../components/NavbarPrivate.jsx";
import "./HomePrivate.css";

export default function HomePrivate() {
  return (
    <div className="Home">
      <NavbarPrivate />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Bienvenue de retour sur CodeArena !</h1>
          <a href="/Defis" className="hero-btn">Commencer</a>
        </div>
      </section>
    </div>
  );
}
