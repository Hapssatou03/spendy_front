import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import "./Incomes.css";

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchIncomes = async () => {
    const token = localStorage.getItem("token");
    console.log(" JWT token utilisé :", token);

    try {
      const response = await axios.get("http://localhost:6415/api/incomes/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sorted = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setIncomes(sorted);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Erreur lors du chargement des revenus";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Tu veux vraiment supprimer ce revenu ? 😢")) return;

    try {
      const response = await axios.delete(
        `http://localhost:6415/api/incomes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(" Réponse suppression :", response.data);
      toast.success(" Revenu supprimé avec succès ! ✅");

      await fetchIncomes();
    } catch (err) {
      console.error("Erreur suppression :", err);
      toast.error(" Erreur lors de la suppression.");
    }
  };

  return (
    <div className="incomes-container">
      <div className="incomes-header">
        <h2>Mes Revenus</h2>
        <button className="add-btn" onClick={() => navigate("/income/add")}>
          ➕ Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : incomes.length === 0 ? (
        <p>Aucun revenu enregistré.</p>
      ) : (
        <ul className="incomes-list">
          {incomes.map((income) => (
            <li key={income.id} className="income-item">
              <div className="income-info">
                <div>
                  <strong>{income.amount} €</strong> – {income.date}
                </div>
                {income.description && (
                  <div className="description">{income.description}</div>
                )}
              </div>
              <div className="actions">
                <button onClick={() => navigate(`/income/edit/${income.id}`)}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(income.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Incomes;
