import "./Home.css";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="Home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Améliorez vos compétences et affrontez les meilleurs développeurs.
          </h1>

          <a href="#features" className="hero-btn">Commencer</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
  <div className="features-grid">

    <FeatureCard
      icon="🧠"
      title="Compétition de code en temps réel"
      description="Affrontez des développeurs en direct à travers des défis intensifs et évolutifs."
    />

    <FeatureCard
      icon="💻"
      title="Éditeur de code intégré"
      description="Écrivez et testez votre code dans un environnement propre et moderne."
    />

    <FeatureCard
      icon="🛡️"
      title="Exécution sécurisée"
      description="Toutes les soumissions s’exécutent dans un système isolé garantissant une sécurité maximale."
    />

    <FeatureCard
      icon="🌐"
      title="Support multilangage"
      description="Python, C++, Java… chaque langage utilise son propre environnement isolé."
    />

    <FeatureCard
      icon="📊"
      title="Classements dynamiques"
      description="Scores et résultats mis à jour en temps réel grâce à Socket.io."
    />

    <FeatureCard
      icon="👑"
      title="Gestion avancée des concours"
      description="Créez et administrez vos concours comme un vrai organisateur professionnel."
    />

  </div>
</section>


    </div>
  );
}
