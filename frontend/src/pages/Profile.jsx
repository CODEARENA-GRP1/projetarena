import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <main className="page-section container">
      <h1>Profil</h1>
      <p>Informations utilisateur — connecte-toi pour voir les détails.</p>
      <p><Link to="/login">Se connecter</Link> · <Link to="/">Accueil</Link></p>
    </main>
  );
}