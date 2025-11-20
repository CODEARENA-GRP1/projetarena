import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <section className="hero">
        <h1>Welcome to CodeArena</h1>
        <p>Compete in real-time coding battles and climb the leaderboard.</p>

        <button className="btn-primary hero-btn">
          Start a Battle
        </button>
      </section>

      <section className="features">
        <FeatureCard
          icon="⚡"
          title="Real-Time Battles"
          text="Play live against other programmers."
        />
        <FeatureCard
          icon="🧪"
          title="Secure Sandbox"
          text="Your code runs safely in Docker containers."
        />
        <FeatureCard
          icon="🏆"
          title="Live Scoreboard"
          text="Scores update instantly in real time."
        />
      </section>

      <footer className="footer">
        © 2025 CodeArena — All rights reserved.
      </footer>
    </div>
  );
}
