// src/pages/expenses/Expenses.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //  Pour naviguer entre les pages
import axios from "axios";
import "./Expenses.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🗑️ Supprimer une dépense
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tu veux vraiment supprimer cette dépense ? 😢")) return;

    try {
      await axios.delete(`http://localhost:6415/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  // 🔄 Récupérer toutes les dépenses
  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:6415/api/expenses/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sorted);
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur lors du chargement des dépenses";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expenses-page"> {/* 👈 encapsulation globale obligatoire */}
      
      {/* 🔙 Retour au profil */}
      {/* <div className="back-to-account">
        <button onClick={() => navigate("/account")}>← Retour au profil</button>
      </div> */}

      {/* 📋 Contenu de la page */}
      <div className="expenses-container">
        <h2>Mes Dépenses</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : expenses.length === 0 ? (
          <p>Aucune dépense enregistrée.</p>
        ) : (
          <ul className="expenses-list">
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div>
                  <strong>{expense.name}</strong> – {expense.amount} €
                </div>
                <div>
                  {expense.date} | Catégorie : {expense.categoryName}
                </div>
                {expense.description && (
                  <div className="description">{expense.description}</div>
                )}

                <div className="actions">
                  <button onClick={() => navigate(`/expense/edit/${expense.id}`)}>✏️</button>
                  <button onClick={() => handleDelete(expense.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ➕ Bouton pour ajouter une dépense */}
        <div className="add-expense-button">
          <button onClick={() => navigate("/expense/add")}>➕ Ajouter une dépense</button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
