import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="settings-layout">

      {/* SIDEBAR À GAUCHE */}
      <Sidebar />

      {/* CONTENU PRINCIPAL */}
      <main className="settings-content">

        <h1 className="settings-title">Paramètres</h1>

        {/* SECTION — COMPTE */}
        <section className="settings-card">
          <h2>Compte</h2>

          <div className="field">
            <label>Nom complet</label>
            <input type="text" placeholder="Votre nom" />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="votre@email.com" />
          </div>

          <div className="field">
            <label>Téléphone</label>
            <input type="text" placeholder="+212 6 00 00 00 00" />
          </div>

          <div className="field">
            <label>Pays</label>
            <select>
              <option>Maroc</option>
              <option>France</option>
              <option>Belgique</option>
            </select>
          </div>

          <button className="btn-save">Enregistrer</button>
        </section>

        {/* SECTION — SÉCURITÉ */}
        <section className="settings-card">
          <h2>Sécurité</h2>

          <div className="field row-field">
            <label>Changer le mot de passe</label>
            <button className="btn-secondary">Modifier</button>
          </div>

          <div className="toggle-row">
            <span>Authentification à deux facteurs</span>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={() => setTwoFA(!twoFA)}
            />
          </div>

          <div className="divider"></div>

          <h3>Sessions actives</h3>
          <ul className="sessions-list">
            <li>• Chrome — Windows 10 — il y a 2 heures</li>
            <li>• Safari — iPhone 14 — Actif</li>
            <li>• Firefox — MacOS — il y a 1 jour</li>
          </ul>

          <button className="btn-danger">Déconnecter toutes les sessions</button>
        </section>

        {/* SECTION — APPARENCE */}
        <section className="settings-card">
          <h2>Apparence</h2>

          <div className="toggle-row">
            <span>Mode sombre</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="field">
            <label>Taille du texte</label>
            <select>
              <option>Normal</option>
              <option>Large</option>
              <option>Très large</option>
            </select>
          </div>

          <div className="field">
            <label>Couleur d’accent</label>
            <select>
              <option>Violet (par défaut)</option>
              <option>Bleu</option>
              <option>Rose</option>
              <option>Orange</option>
            </select>
          </div>

          <button className="btn-save">Appliquer</button>
        </section>

        {/* SECTION — NOTIFICATIONS */}
        <section className="settings-card">
          <h2>Notifications</h2>

          <div className="toggle-row">
            <span>Notifications par email</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="toggle-row">
            <span>Notifications push</span>
            <input type="checkbox" />
          </div>

          <div className="toggle-row">
            <span>Alertes de sécurité</span>
            <input type="checkbox" defaultChecked />
          </div>

          <button className="btn-save">Enregistrer</button>
        </section>

        {/* SECTION — DANGER */}
        <section className="settings-card danger-zone">
          <h2>Zone dangereuse</h2>
          <button className="btn-warning">Désactiver le compte</button>
          <button className="btn-danger">Supprimer définitivement</button>
        </section>

      </main>
    </div>
  );
}
