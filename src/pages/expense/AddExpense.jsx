import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css";
import { FaPlus, FaTag, FaEuroSign, FaCalendarAlt, FaClipboard } from "react-icons/fa";

const AddExpense = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // État du formulaire de dépense
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    date: "",
    categoryId: ""
  });

  // Liste des catégories récupérées depuis l'API
  const [categories, setCategories] = useState([]);

  // Message de confirmation ou d'erreur
  const [message, setMessage] = useState("");

  // États pour gérer l'ajout d'une nouvelle catégorie
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  // Récupère les catégories dès que le composant est monté
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:6415/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      }
    };
    fetchCategories();
  }, [token]);

  // Ajoute une nouvelle catégorie via l'API
  const handleAddCategory = async () => {
    try {
      // Récupère l'ID de l'utilisateur à partir du token
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      const res = await axios.post("http://localhost:6415/api/categories", {
        ...newCategory,
        userId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Met à jour la liste des catégories et sélectionne la nouvelle
      setCategories([...categories, res.data]);
      setFormData({ ...formData, categoryId: res.data.id });
      setNewCategory({ name: "", description: "" });
      setShowCategoryForm(false);
    } catch {
      alert("Erreur lors de l’ajout de la catégorie.");
    }
  };

  // Envoie le formulaire de dépense à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount), // Convertit le montant en float
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
    };

    try {
      await axios.post("http://localhost:6415/api/expenses", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Dépense ajoutée avec succès ! 🎉");
      setTimeout(() => navigate("/expenses"), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || error.message;
      console.error("Erreur lors de l’ajout de la dépense :", errorMsg);
      setMessage(`Erreur lors de l’ajout 😢 : ${errorMsg}`);
    }
  };

  // Gère les changements de champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "date"
      ? new Date(value).toISOString().split("T")[0] // Format ISO pour la date
      : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div className="add-expense-container">
      <h2>Ajouter une dépense</h2>
      <form onSubmit={handleSubmit} className="expense-form">

        {/* Champ nom de la dépense */}
        <div className="input-group">
          <FaTag className="input-icon" />
          <input type="text" name="name" placeholder="Nom du poste de dépense" onChange={handleChange} required />
        </div>

        {/* Champ montant */}
        <div className="input-group">
          <FaEuroSign className="input-icon" />
          <input type="number" name="amount" placeholder="Montant (€)" onChange={handleChange} required />
        </div>

        {/* Champ date */}
        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <input type="date" name="date" onChange={handleChange} required />
        </div>

        {/* Champ description */}
        <div className="input-group">
          <FaClipboard className="input-icon" />
          <textarea name="description" placeholder="Note ou description" onChange={handleChange} />
        </div>

        {/* Sélection d'une catégorie */}
        <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Lien pour ajouter une nouvelle catégorie */}
        <p className="add-link" onClick={() => setShowCategoryForm(true)}>
          ➕ Ajouter une nouvelle catégorie
        </p>

        {/* Formulaire pour créer une nouvelle catégorie */}
        {showCategoryForm && (
          <div className="inline-form">
            <input
              type="text"
              placeholder="Nom de la catégorie"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description (facultative)"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <button type="button" onClick={handleAddCategory}>Ajouter</button>
          </div>
        )}

        {/* Bouton pour soumettre la dépense */}
        <button type="submit">➖ Ajouter la dépense</button>

        {/* Message de feedback */}
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddExpense;
