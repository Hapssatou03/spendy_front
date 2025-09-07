import React from "react";
import "./ConfidentialityModal.css";

const ConfidentialityModal = ({ onClose, user }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Modifier mes informations</h3>

        <label>Email</label>
        <input type="email" defaultValue={user.email} />

        <label>Téléphone</label>
        <input type="tel" placeholder="Votre numéro" />

        <label>Nouveau mot de passe</label>
        <input type="password" placeholder="********" />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn-save">Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default ConfidentialityModal;
