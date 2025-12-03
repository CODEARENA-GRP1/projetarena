import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <main className="login-page">
      <div className="auth-card">
        <h1>S'inscrire</h1>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Nom complet
            <input type="text" name="name" required placeholder="Votre nom complet" />
          </label>

          <label>
            Email
            <input type="email" name="email" required placeholder="votre@email.com" />
          </label>

          <label>
            Mot de passe
            <input type="password" name="password" required placeholder="••••••••" />
          </label>

          <button type="submit" className="btn btn-primary">Créer un compte</button>
        </form>

        <p className="auth-help">Déjà inscrit ? <Link to="/login" style={{ textDecoration: 'none' }}>Se connecter</Link></p>
        <p className="auth-help"><Link to="/" style={{ textDecoration: 'none' }}>← Retour</Link></p>
      </div>
    </main>
  );
}