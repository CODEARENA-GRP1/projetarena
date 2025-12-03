import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <main className="page-section container">
      <h1>Contact</h1>
      <p>Pour nous contacter : hello@codearena.example</p>
      <p>Ou utilise le formulaire (à implémenter).</p>
      <p><Link to="/">← Retour</Link></p>
    </main>
  );
}