// src/pages/expense/EditExpense.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddExpense.css"; 

const EditExpense = () => {
  const { id } = useParams(); // Récupère l’ID depuis l’URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    date: "",
    categoryId: "",
    budgetId: ""
  });

  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState("");

  // 📦 Charger les catégories, budgets et la dépense existante
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [catRes, budRes, expRes] = await Promise.all([
          axios.get("http://localhost:6415/api/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:6415/api/budgets", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:6415/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCategories(catRes.data);
        setBudgets(budRes.data);
        const { name, amount, description, date, categoryId, budgetId } = expRes.data;
        setFormData({ name, amount, description, date, categoryId, budgetId });
      } catch {
        setMessage("Erreur lors du chargement de la dépense");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const formatted = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 💾 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:6415/api/expenses/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Dépense modifiée avec succès ! 🎉");
      setTimeout(() => navigate("/expenses"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data || err.message;
      setMessage(`Erreur 😢 : ${errorMsg}`);
    }
  };

  return (
    <div className="add-expense-container">
      <h2>Modifier une dépense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Nom"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          placeholder="Montant (€)"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select name="budgetId" value={formData.budgetId} onChange={handleChange}>
          <option value="">Aucun budget assigné</option>
          {budgets.map((bud) => (
            <option key={bud.id} value={bud.id}>
              {bud.name} ({bud.amount} €)
            </option>
          ))}
        </select>

        <button type="submit"> Enregistrer</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default EditExpense;
