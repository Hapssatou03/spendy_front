import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AddBudget() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    amount: "0",         
    startDate: "",
    endDate: ""
  });
  const [error, setError] = useState("");

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérification date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("⚠️ La date de fin doit être postérieure à la date de début.");
      return;
    }

    const payload = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    // Debug
    console.log("Submitting budget:", {
      url: "http://localhost:6415/api/budgets",
      payload
    });

    try {
      await axios.post("http://localhost:6415/api/budgets", payload, authHeaders);
      navigate("/budgets");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("❌ Vous n'avez pas la permission d'ajouter ce budget.");
      } else {
        setError("⚠️ Erreur lors de la création du budget.");
      }
      console.error("Erreur ajout budget :", err);
    }
  };

  return (
    <div className="add-budget-page">
      <h2>Ajouter un nouveau budget</h2>
      <form onSubmit={handleSubmit} className="budget-form">
        <input
          name="name"
          type="text"
          placeholder="Nom du budget"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Montant (€)"
          min="0"              
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <label>
          Date de début
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date de fin
          <input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Ajouter</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default AddBudget;
