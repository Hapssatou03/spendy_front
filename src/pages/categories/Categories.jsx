import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔁 Charger toutes les catégories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:6415/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch {
      setMessage("Erreur de chargement des catégories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔄 Mise à jour des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Ajouter ou modifier une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // 🔁 Modifier
        await axios.put(`http://localhost:6415/api/categories/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Catégorie modifiée !");
      } else {
        // ➕ Ajouter
        const userId = JSON.parse(atob(token.split('.')[1])).userId; // ou récup via `/me`
        await axios.post("http://localhost:6415/api/categories", { ...formData, userId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Catégorie ajoutée !");
      }

      setFormData({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch {
      setMessage("Erreur lors de l’enregistrement.");
    }
  };

  // ✏️ Préparer modification
  const startEdit = (cat) => {
    setFormData({ name: cat.name, description: cat.description || "" });
    setEditingId(cat.id);
  };

  // 🗑️ Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await axios.delete(`http://localhost:6415/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch {
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
        <button type="submit">
          {editingId ? "💾 Modifier" : "➕ Ajouter"}
        </button>
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
