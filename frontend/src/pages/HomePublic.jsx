import NavbarPublic from "../components/NavbarPublic";

import "./HomePublic.css";

export default function HomePublic() {
  return (
    <div className="Home">
      <NavbarPublic />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Améliorez vos compétences avec CcodeArena</h1>
          <a href="/login" className="hero-btn">Commencer</a>
        </div>
      </section>
    </div>
  );
}
