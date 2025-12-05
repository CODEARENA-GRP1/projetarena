import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  return (
    <main className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div className="header-left">
          <h2>Bienvenue, Arnaud</h2>
          <p className="date">Tue, 07 June 2022</p>
        </div>

        <div className="header-right">
          <input type="text" placeholder="Rechercher" className="search-bar" />
          <img src="/avatar.jpg" alt="avatar" className="top-avatar" />
        </div>
      </div>

      {/* TOP CARD */}
      <div className="profile-top-card">
        <div className="profile-user">
          <img src="/avatar.jpg" className="profile-img" alt="User" />
          <div>
            <h3>Arnaud Louis</h3>
            <p>arnaudlouis@gmail.com</p>
          </div>
        </div>

        <button className="edit-btn">Edit</button>
      </div>

      {/* FORM */}
      <div className="profile-form">
        <div className="grid-2">
          <div className="field">
            <label>Nom complet</label>
            <input type="text" placeholder="Nom" />
          </div>

          <div className="field">
            <label>Prénom</label>
            <input type="text" placeholder="Prénom" />
          </div>

          <div className="field">
            <label>Genre</label>
            <select>
              <option>Sexe</option>
            </select>
          </div>

          <div className="field">
            <label>Pays</label>
            <select>
              <option>Pays</option>
            </select>
          </div>

          <div className="field">
            <label>Langue</label>
            <select>
              <option>Langue</option>
            </select>
          </div>
        </div>

        {/* EMAIL SECTION */}
        <div className="email-section">
          <h3>Mon adresse e-mail</h3>

          <div className="email-box">
            <div>
              <p className="email">arnaudlouis@gmail.com</p>
              <p className="email-date">Il y a 1 mois</p>
            </div>
          </div>

          <button className="add-email">+ Ajouter une adresse e-mail</button>
        </div>
      </div>
    </main>
  );
}
