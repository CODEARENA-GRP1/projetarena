import React from 'react';
import { Link } from 'react-router-dom';

export default function Defis() {
  return (
    <main className="page-section container">
      <h1>Défis</h1>
      <p>Liste des défis à venir / en cours (placeholder).</p>
      <p><Link to="/">← Retour</Link></p>
    </main>
  );
}