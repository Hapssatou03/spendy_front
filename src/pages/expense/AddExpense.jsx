import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css";

const AddExpense = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Données du formulaire de dépense
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    date: "",
    categoryId: "",
    budgetId: "",
  });

  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState("");

  // Pour ajouter une nouvelle catégorie
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  //  Charger catégories et budgets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, budRes] = await Promise.all([
          axios.get("http://localhost:6415/api/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:6415/api/budgets", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCategories(catRes.data);
        setBudgets(budRes.data);
      } catch (error) {
        console.error("Erreur chargement catégories/budgets :", error);
      }
    };

    fetchData();
  }, [token]);

  //  Gérer l’ajout de catégorie
  const handleAddCategory = async () => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      const res = await axios.post("http://localhost:6415/api/categories", {
        ...newCategory,
        userId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories([...categories, res.data]);
      setFormData({ ...formData, categoryId: res.data.id });
      setNewCategory({ name: "", description: "" });
      setShowCategoryForm(false);
    } catch {
      alert("Erreur lors de l’ajout de la catégorie.");
    }
  };

  //  Gérer le formulaire principal
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount),
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      budgetId: formData.budgetId ? parseInt(formData.budgetId) : null,
    };

    try {
      await axios.post("http://localhost:6415/api/expenses", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Dépense ajoutée avec succès ! 🎉");
      setTimeout(() => navigate("/expenses"), 1500);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.response?.data || error.message;
      console.error("Erreur lors de l’ajout de la dépense :", errorMsg);
      setMessage(`Erreur lors de l’ajout 😢 : ${errorMsg}`);
    }
  };

  //  Mettre à jour les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "date"
      ? new Date(value).toISOString().split("T")[0]
      : value;

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div className="add-expense-container">
      <h2>Ajouter une dépense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Montant (€)"
          onChange={handleChange}
          required
        />
        <input type="date" name="date" onChange={handleChange} required />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        {/* --- Catégories --- */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Lien d’ajout de catégorie */}
        <p className="add-link" onClick={() => setShowCategoryForm(true)}>
          ➕ Ajouter une nouvelle catégorie
        </p>

        {showCategoryForm && (
          <div className="inline-form">
            <input
              type="text"
              placeholder="Nom de la catégorie"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description (facultative)"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <button type="button" onClick={handleAddCategory}>
               Ajouter
            </button>
          </div>
        )}

        {/* --- Budget --- */}
        <select name="budgetId" onChange={handleChange}>
          <option value="">Aucun budget assigné</option>
          {budgets.map((bud) => (
            <option key={bud.id} value={bud.id}>
              {bud.name} ({bud.amount} €)
            </option>
          ))}
        </select>

        <button type="submit">➖ Ajouter la dépense</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddExpense;
