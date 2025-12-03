import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '💡', title: 'Plateforme de compétition de code en temps réel', text: "Affrontez d'autres participants simultanément sur des défis de programmation. Résultats en temps réel." , color: '#f97316' },
  { icon: '🖥', title: 'Éditeur de code intégré', text: 'Éditez, testez et soumettez directement depuis l’interface avec coloration syntaxique.', color: '#06b6d4' },
  { icon: '🔒', title: 'Exécution sécurisée du code', text: "Chaque soumission est exécutée dans un conteneur isolé pour sécurité et équité.", color: '#ef4444' },
  { icon: '🌐', title: 'Support multilangage', text: 'Prise en charge de Python, Java, C/C++… via environnements dédiés.', color: '#10b981' },
  { icon: '📊', title: 'Tableau des scores dynamique', text: 'Classements et scores mis à jour en direct sans rechargement.', color: '#f59e0b' },
  { icon: '🏆', title: 'Gestion complète des concours', text: 'Créez et gérez concours, problèmes et classements facilement.', color: '#8b5cf6' },
];

export default function Home() {
  return (
    <div className="page">

      <header className="hero">

        {/* NAVBAR */}
        <div className="nav">
          <div className="logo">
            <img src="/src/assets/images/logo.jpg" alt="Codearena" className="logo-img" />
            <span className="site-title">CODEARENA</span>
          </div>

          {/* nav texts */}
          <div className="nav-texts" aria-hidden="true">
            <span className="nav-text">Accueil</span>
            <span className="nav-text">Contact</span>
            <span className="nav-text">Profile</span>
            <span className="nav-text">Défis</span>
          </div>

          <div className="auth" role="group" aria-label="Authentification">
            <Link to="/login" className="btn btn-outline">Se connecter</Link>
            <Link to="/register" className="btn btn-primary">S'inscrire</Link>
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="hero-content">
          <h1>Améliorez vos compétences et affrontez les meilleurs développeurs.</h1>
          <a className="cta" href="#">Commencer</a>
        </div>

      </header>

      {/* FEATURES SECTION */}
      <section className="features clean-features">
        <div className="container">
          <div className="cards-grid">

            {features.map((f, i) => (
              <article className="feature-card" key={i}>

                <div
                  className="card-icon"
                  style={{
                    background: `${f.color}22`,
                    borderColor: f.color
                  }}
                >
                  <span className="emoji">{f.icon}</span>
                </div>

                <div className="card-body">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">

          <div className="footer-brand">
            <img src="/src/assets/images/logo.png" alt="Codearena" className="footer-logo" />
            <p>Codearena — plateforme de compétition et d'apprentissage pour développeurs.</p>
          </div>

          <div className="footer-links">
            <h4>Liens</h4>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Défis</a></li>
              <li><a href="#">Profil</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>hello@codearena.example</p>
            <p>© {new Date().getFullYear()} Codearena</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
