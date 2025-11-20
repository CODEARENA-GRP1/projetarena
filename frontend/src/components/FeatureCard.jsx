import "./FeatureCard.css";

export default function FeatureCard({ title, text, icon }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
