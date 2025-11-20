import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">CodeArena</h1>
      <div className="nav-links">
        <button className="btn-link">Login</button>
        <button className="btn-primary">Register</button>
      </div>
    </nav>
  );
}
