import React from "react";
import Sidebar from "../components/Sidebar";
import "./Defis.css";

export default function Defis() {
  return (
    <div className="defis-page">

      {/* --- SIDEBAR GAUCHE --- */}
      <Sidebar />

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="defis-container">

        {/* TITRE */}
        <h1 className="defis-title">Bonjour ARNAUD 👋</h1>

        {/* STATISTIQUES */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Défis totaux</h3>
            <p className="stat-number">5,423</p>
            <span className="stat-up">⬆ 16% Ce mois-ci</span>
          </div>

          <div className="stat-card">
            <h3>Membres</h3>
            <p className="stat-number">1,893</p>
            <span className="stat-down">⬇ 1% Ce mois-ci</span>
          </div>

          <div className="stat-card">
            <h3>Actifs maintenant</h3>
            <p className="stat-number">189</p>
          </div>
        </div>

        {/* TABLEAU DES DÉFIS */}
        <div className="table-section">
          <h2>Liste des défis</h2>

          <table className="defis-table">
            <thead>
              <tr>
                <th>Nom du défi</th>
                <th>Difficulté</th>
                <th>Langage supporté</th>
                <th>Participants</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Jane Cooper</td>
                <td>Facile</td>
                <td>JAVA</td>
                <td>555</td>
                <td>2000</td>
                <td><span className="status active">Actif</span></td>
              </tr>

              <tr>
                <td>Floyd Miles</td>
                <td>Difficile</td>
                <td>JAVAE</td>
                <td>118</td>
                <td>1999</td>
                <td><span className="status inactive">Inactif</span></td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Moyen</td>
                <td>HTML</td>
                <td>225</td>
                <td>500</td>
                <td><span className="status inactive">Inactif</span></td>
              </tr>

              <tr>
                <td>Marvin McKinney</td>
                <td>Difficile</td>
                <td>CSS</td>
                <td>555</td>
                <td>666</td>
                <td><span className="status active">Actif</span></td>
              </tr>

              <tr>
                <td>Jerome Bell</td>
                <td>Facile</td>
                <td>JS</td>
                <td>225</td>
                <td>5555</td>
                <td><span className="status active">Actif</span></td>
              </tr>

              <tr>
                <td>Kathryn Murphy</td>
                <td>Moyen</td>
                <td>HTML / CSS</td>
                <td>666</td>
                <td>1000</td>
                <td><span className="status active">Actif</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
