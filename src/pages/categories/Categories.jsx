import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔁 Charger uniquement les catégories du user connecté
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:6415/api/categories/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
      setMessage("Erreur de chargement des catégories.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:6415/api/categories/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Catégorie modifiée !");
      } else {
        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        await axios.post("http://localhost:6415/api/categories", { ...formData, userId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Catégorie ajoutée !");
      }

      setFormData({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Erreur création catégorie :", err);
      setMessage("Erreur lors de l’enregistrement.");
    }
  };

  const startEdit = (cat) => {
    setFormData({ name: cat.name, description: cat.description || "" });
    setEditingId(cat.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await axios.delete(`http://localhost:6415/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error("Erreur suppression catégorie :", err);
      setMessage("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="categories-container">
      <h2>🧩 Gestion des catégories</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Nom de la catégorie"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description (facultative)"
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit">
            {editingId ? "💾 Modifier" : "➕ Ajouter"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
              ❌ Annuler
            </button>
          )}
        </div>
      </form>

      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            <div>
              <strong>{cat.name}</strong><br />
              {cat.description && <em>{cat.description}</em>}
            </div>
            <div className="actions">
              <button onClick={() => startEdit(cat)}>✏️</button>
              <button onClick={() => handleDelete(cat.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
