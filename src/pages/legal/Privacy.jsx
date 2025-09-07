import React from "react";
import "./Legal.css";

function Privacy() {
  return (
    <div className="legal-page">
      <h1>Mentions légales et politique de confidentialité</h1>
      <p>Dernière mise à jour : 20 juillet 2025</p>

      <h2>1. Éditeur</h2>
      <p>
        Spendy est un projet développé par Hapssatou SY dans le cadre de la formation CDA.
        Pour toute question, vous pouvez nous contacter à l’adresse suivante : contact@spendy.fr
      </p>

      <h2>2. Hébergeur</h2>
      <p>
        L’application est hébergée sur les plateformes Render (backend) et Vercel (frontend).
      </p>

      <h2>3. Données personnelles</h2>
      <p>
        Vos données sont stockées de manière sécurisée. Aucune information personnelle ne sera vendue,
        cédée ou partagée sans votre consentement explicite.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Ce site utilise uniquement des cookies strictement nécessaires au bon fonctionnement de l’application.
        Vous pouvez à tout moment gérer vos préférences via le bandeau de cookies.
      </p>

      <h2>5. Droits des utilisateurs</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
      </p>
      <ul>
        <li> Droit d'accès : vous pouvez demander à consulter les données personnelles que nous détenons sur vous.</li>
        <li> Droit de rectification : vous pouvez corriger vos informations si elles sont inexactes ou incomplètes.</li>
        <li> Droit à l’effacement : vous pouvez demander la suppression de vos données à tout moment.</li>
        <li> Droit d’opposition : vous pouvez refuser certains traitements de vos données.</li>
        <li> Droit à la portabilité : vous pouvez demander à recevoir vos données dans un format structuré.</li>
      </ul>

      <h2>6. Contact RGPD</h2>
      <p>
        Pour exercer vos droits ou poser une question sur notre politique de confidentialité, écrivez-nous à :
        <strong> contact@spendy.fr </strong>
      </p>
    </div>
  );
}

export default Privacy;
