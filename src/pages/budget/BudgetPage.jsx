import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BudgetPage.css";
import { useAuth } from "../../context/AuthContext";

const BudgetPage = () => {
  const { token } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    amount: "",
    startDate: "",
    endDate: ""
  });
  const [message, setMessage] = useState("");


  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };


  const fetchBudgets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6415/api/budgets/me",
        authHeaders
      );
      setBudgets(res.data);
    } catch (err) {
      console.error("Erreur fetch budgets", err);
    }
  };

  useEffect(() => {
    if (token) fetchBudgets();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = Boolean(formData.id);
    const url = isEdit
      ? `http://localhost:6415/api/budgets/${formData.id}`
      : "http://localhost:6415/api/budgets";
    const method = isEdit ? "put" : "post";

    try {
      await axios[method](url, {
        name: formData.name,
        amount: parseFloat(formData.amount),
        startDate: formData.startDate,
        endDate: formData.endDate
      }, authHeaders);

      setMessage(isEdit ? "Budget modifié !" : "Budget ajouté !");
      clearMessage();

      // Reset form
      setFormData({ id: null, name: "", amount: "", startDate: "", endDate: "" });
      fetchBudgets();
    } catch (err) {
      console.error("Erreur enregistrement budget", err);
      setMessage("Erreur lors de l’enregistrement.");
      clearMessage();
    }
  };

  const handleEdit = (b) => {
    setFormData({
      id: b.id,
      name: b.name,
      amount: b.amount,
      startDate: b.startDate,
      endDate: b.endDate
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce budget ?")) return;
    try {
      await axios.delete(`http://localhost:6415/api/budgets/${id}`, authHeaders);
      setMessage("Budget supprimé !");
      clearMessage();
      fetchBudgets();
    } catch (err) {
      console.error("Erreur suppression budget", err);
      setMessage("Erreur lors de la suppression.");
      clearMessage();
    }
  };

  return (
    <div className="budget-page">
      <h2>Définir un Budget</h2>

      <form className="budget-form" onSubmit={handleSubmit}>
        {/* champ caché pour l'id en édition */}
        {formData.id && (
          <input type="hidden" name="id" value={formData.id} />
        )}

        <input
          type="text"
          name="name"
          placeholder="Nom du budget"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Montant (€)"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {formData.id ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {message && <p className="budget-message">{message}</p>}

      <h3>Mes Budgets</h3>
      <div className="budget-list">
        {budgets.length === 0 && <p>Aucun budget défini.</p>}

        {budgets.map((b) => (
          <div key={b.id} className="budget-item">
            <h4>{b.name}</h4>
            <p>Montant : {b.amount.toFixed(2)} €</p>
            <p>Du {b.startDate} au {b.endDate}</p>
            <div className="budget-actions">
              <button onClick={() => handleEdit(b)}>✏️</button>
              <button onClick={() => handleDelete(b.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
