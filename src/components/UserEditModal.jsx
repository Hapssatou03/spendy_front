import React, { useState } from "react";
import "./UserEditModal.css";

export default function UserEditModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
  id: user.id,
  prenom: user.prenom || "",
  nom: user.nom || "",
  email: user.email || "",
  telephone: user.telephone || "",
  role: user.role || "USER",
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  alert("Le formulaire a bien été soumis !");
  console.log("Données du formulaire :", form);
  onSave(form);
};


  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier Utilisateur</h2>
        <form onSubmit={handleSubmit}>
          <label>Prénom :
            <input name="prenom" value={form.prenom} onChange={handleChange} />
          </label>
          <label>Nom :
            <input name="nom" value={form.nom} onChange={handleChange} />
          </label>
          <label>Email :
            <input name="email" value={form.email} onChange={handleChange} />
          </label>
          <label>Téléphone :
            <input name="telephone" value={form.telephone} onChange={handleChange} />
          </label>
          <label>Rôle :
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
