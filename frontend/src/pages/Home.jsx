import React from "react";
import "./Home.css";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="home">

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Améliorez vos compétences et <br /> affrontez les meilleurs
            développeurs.
          </h1>

          <a href="#features" className="hero-btn">
            Commencer
          </a>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="features" id="features">
        <div className="features-grid">

          <FeatureCard
            icon="🧠"
            title="Plateforme de compétition de code"
            text="Affrontez d’autres participants sur des défis en temps réel. Les résultats s’actualisent instantanément."
          />

          <FeatureCard
            icon="💻"
            title="Éditeur de code intégré"
            text="Un éditeur moderne permet d’écrire, tester et soumettre du code directement depuis l’interface."
          />

          <FeatureCard
            icon="🛡"
            title="Exécution sécurisée du code"
            text="Chaque soumission est exécutée dans un conteneur isolé pour garantir sécurité et stabilité."
          />

          <FeatureCard
            icon="🌐"
            title="Support multilangage"
            text="Python, C++, Java... Conteneurs dédiés, cohérents et isolés."
          />

          <FeatureCard
            icon="📊"
            title="Tableau des scores dynamique"
            text="Scores mis à jour automatiquement en temps réel grâce à Socket.io."
          />

          <FeatureCard
            icon="👑"
            title="Gestion des concours"
            text="Créez et gérez vos concours : problèmes, participants et scores."
          />

        </div>
      </section>

    </div>
  );
}
