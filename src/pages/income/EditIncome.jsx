import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddIncome.css";

const EditIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:6415/api/incomes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { name, amount, description, date } = res.data;
        setFormData({ name, amount, description, date });
      })
      .catch((err) => {
        console.error("Erreur chargement revenu :", err);
        setMessage("Erreur lors du chargement.");
      });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:6415/api/incomes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Revenu modifié avec succès ! 🎉");
      setTimeout(() => navigate("/incomes"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data || err.message;
      console.error("Erreur modification revenu :", errorMsg);
      setMessage(`Erreur 😢 : ${errorMsg}`);
    }
  };

  return (
    <div className="add-income-container">
      <form onSubmit={handleSubmit} className="income-form">
        <h2 className="form-title">Modifier un revenu</h2>

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

        <button type="submit">Enregistrer les modifications</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default EditIncome;
