import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Ici tu pourrais envoyer les données au backend (optionnel)
    // Pour l'instant, simple redirection avec message :
    navigate("/login", {
      state: { successMessage: "Compte créé avec succès !" }
    });
  };

  return (
    <main className="login-page">
      <div className="auth-card">
        <h1>S'inscrire</h1>

        {/* 🔥 handleRegister déclenche la redirection */}
        <form className="auth-form" onSubmit={handleRegister}>
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

          <button type="submit" className="btn btn-primary">
            Créer un compte
          </button>
        </form>

        <p className="auth-help">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>

        <p className="auth-help">
          <Link to="/">← Retour</Link>
        </p>
      </div>
    </main>
  );
}
