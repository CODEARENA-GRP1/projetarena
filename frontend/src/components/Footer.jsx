import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-title">Contactez-nous</h2>

      <div className="contact-links">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="mailto:codearena@gmail.com">Email</a>
        <a href="#">LinkedIn</a>
        <a href="#">Discord</a>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} CodeArena — Tous droits réservés.
      </p>
    </footer>
  );
}
