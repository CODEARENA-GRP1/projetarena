import React from "react";
import "./Home.css";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="Home">

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
            description="Affrontez d’autres participants sur des défis en temps réel. Les résultats s’actualisent instantanément."
          />

          <FeatureCard
            icon="💻"
            title="Éditeur de code intégré"
            description="Un éditeur moderne permet d’écrire, tester et soumettre du code directement depuis l’interface."
          />

          <FeatureCard
            icon="🛡"
            title="Exécution sécurisée du code"
            description="Chaque soumission est exécutée dans un conteneur isolé pour garantir sécurité et stabilité."
          />

          <FeatureCard
            icon="🌐"
            title="Support multilangage"
            description="Python, C++, Java... Tous les langages fonctionnent dans leur conteneur dédié, cohérent et isolé."
          />

          <FeatureCard
            icon="📊"
            title="Tableau des scores dynamique"
            description="Les scores et classements sont mis à jour automatiquement en temps réel grâce à Socket.io."
          />

          <FeatureCard
            icon="👑"
            title="Gestion des concours"
            description="Créez et gérez vos concours : problèmes, participants, scores, tout via une interface simple."
          />

        </div>
      </section>
    </div>
  );
}