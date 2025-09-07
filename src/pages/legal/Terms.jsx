// src/pages/legal/Terms.jsx
import React from "react";
import "./Legal.css";

function Terms() {
  return (
    <div className="legal-page">
      <h1>Conditions Générales d’Utilisation</h1>
      <p>Dernière mise à jour : 20 juillet 2025</p>

      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales régissent l’utilisation de l’application Spendy. En accédant à l’application,
        vous acceptez pleinement ces conditions.
      </p>

      <h2>2. Utilisation du service</h2>
      <p>
        Spendy propose un service de gestion de finances personnelles. L’utilisateur s’engage à fournir des
        informations exactes et à ne pas détourner le service.
      </p>

      <h2>3. Responsabilité</h2>
      <p>
        Spendy ne peut être tenue responsable des pertes ou dommages résultant d’une mauvaise utilisation ou d’une
        interprétation des données fournies.
      </p>

      <h2>4. Modifications</h2>
      <p>
        Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés via l’app
        ou l’email.
      </p>
    </div>
  );
}

export default Terms;
