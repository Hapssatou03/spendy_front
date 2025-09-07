import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./AddIncome.css";

function AddIncome() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await axios.post("http://localhost:6415/api/incomes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Redirection après succès :
      toast.success("💸 Revenu ajouté avec succès !");
      setTimeout(() => {
        navigate("/incomes");
      }, 1000);
    } catch (err) {
      setErrorMsg(" Erreur lors de l’ajout du revenu.");
      console.error(err);
    }
  };

  return (
    <div className="add-income-wrapper">
      <form className="add-income-form" onSubmit={handleSubmit}>
        <h2>Ajouter un revenu</h2>

        <div className="input-group">
          <span className="icon"></span>
          <input
            type="number"
            name="amount"
            placeholder="Montant (€)"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"></span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"></span>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          >
            <option value="">Source</option>
            <option value="Salaire">Salaire</option>
            <option value="Allocation">Allocation</option>
            <option value="Vente">Vente</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="input-group">
          <span className="icon"></span>
          <input
            type="text"
            name="description"
            placeholder="Note ou description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" type="submit">
          ➕ Ajouter le revenu
        </button>

        {(successMsg || errorMsg) && (
          <div className="form-message">
            {successMsg && <p className="success">{successMsg}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddIncome;
