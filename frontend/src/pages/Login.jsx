import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";


export default function Login() {
  return (
    <main className="login-page">
      <div className="auth-card">
        <h1>Se connecter</h1>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Nom d'utilisateur
            <input type="text" name="username" required placeholder="Votre nom d'utilisateur" />
          </label>

          <label>
            Mot de passe
            <input type="password" name="password" required placeholder="••••••••" />
          </label>

          <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>Mot de passe oublié ?</a>

          <button type="submit" className="btn btn-primary">Se connecter</button>
        </form>

        <p className="auth-help">Pas de compte ? <Link to="/register" style={{ textDecoration: 'none' }}>S'inscrire</Link></p>
        <p className="auth-help"><Link to="/" style={{ textDecoration: 'none' }}>← Retour</Link></p>
      </div>
    </main>
  );
}