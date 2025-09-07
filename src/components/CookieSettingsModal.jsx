import React, { useState, useEffect } from "react";

import { getConsent, saveConsent } from "./cookieUtils";

import "./CookieModal.css";

function CookieSettingsModal({ onClose, onSave }) {
  const [consent, setConsent] = useState({
    functional: false,
    performance: false,
    targeting: false,
  });

  useEffect(() => {
    const current = getConsent() || {};
    setConsent({ ...consent, ...current });
  }, []);

  const toggle = (key) => {
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    saveConsent(consent);
    onSave();
  };

  return (
    <div className="cookie-modal-overlay">
      <div className="cookie-modal">
        <h2>Paramètres des cookies</h2>
        <p>Choisissez les types de cookies que vous souhaitez autoriser.</p>

        <div className="cookie-option">
          <strong>Cookies essentiels</strong>
          <p>Nécessaires pour les fonctions de base du site.</p>
        </div>

        <div className="cookie-option">
          <label>
            <input
              type="checkbox"
              checked={consent.functional}
              onChange={() => toggle("functional")}
            />
            Cookies fonctionnels
          </label>
        </div>

        <div className="cookie-option">
          <label>
            <input
              type="checkbox"
              checked={consent.performance}
              onChange={() => toggle("performance")}
            />
            Cookies de performance
          </label>
        </div>
        <div className="cookie-option">
          <label>
            <input
              type="checkbox"
              checked={consent.targeting}
              onChange={() => toggle("targeting")}
            />
            Cookies de ciblage
          </label>
        </div>

        <p className="legal-link">
          Pour en savoir plus, consultez notre{" "}
          <a href="/confidentialites" target="_blank" rel="noopener noreferrer">
            politiques de confidentialité
          </a>{" "}
          et nos{" "}
          <a href="/conditions" target="_blank" rel="noopener noreferrer">
            conditions générales.
          </a>
        </p>

        <div className="modal-buttons">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSave}>Accepter la sélection</button>
        </div>
      </div>
    </div>
  );
}

export default CookieSettingsModal;
