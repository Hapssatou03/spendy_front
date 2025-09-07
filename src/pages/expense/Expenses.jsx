// Import des hooks React
import React, { useEffect, useState } from "react";

// Axios pour les requêtes HTTP
import axios from "axios";

// Link permet de naviguer sans recharger la page
import { Link } from "react-router-dom";

// Icônes pour les boutons Modifier et Supprimer
import { FaEdit, FaTrash } from "react-icons/fa";

// Librairie pour les notifications
import { toast } from "react-toastify";

// CSS spécifique pour cette page
import "./Expenses.css";

const Expenses = () => {
  // État pour stocker les dépenses récupérées
  const [expenses, setExpenses] = useState([]);

  // État pour indiquer si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);

  // État pour gérer les erreurs lors du fetch
  const [error, setError] = useState("");

  //Fonction pour supprimer une dépense
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tu veux vraiment supprimer cette dépense ? 😢"))
      return;

    try {
      await axios.delete(`http://localhost:6415/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(" Dépense supprimée avec succès !");
      setExpenses((prev) => prev.filter((e) => e.id !== id)); // mise à jour du state
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  //Fonction pour récupérer les dépenses

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:6415/api/expenses/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const sorted = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenses(sorted); // mise à jour du state
      return sorted; // <- ici
    } catch (err) {
      const msg =
        err.response?.data?.message || "Erreur lors du chargement des dépenses";
      setError(msg);
      return []; // <- retourne vide en cas d’erreur
    } finally {
      setLoading(false);
    }
  };

  // Appel automatique au chargement du composant
  useEffect(() => {
    fetchExpenses();
  }, []);

  //Formatage des dates
  const formatMonth = (date) =>
    new Date(date).toLocaleString("fr-FR", { month: "long", year: "numeric" });
  const formatDay = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });

  //Regroupement des dépenses par mois
  const grouped = expenses.reduce((acc, exp) => {
    const month = formatMonth(exp.date);
    if (!acc[month]) acc[month] = [];
    acc[month].push(exp);
    return acc;
  }, {});

  //Affichage principal
  return (
    <div className="expenses-container">
      <h2>Dépenses</h2>

      <div className="add-expense-button-container">
        <Link to="/expenses/add" className="add-expense-button">
          Ajouter une dépense
        </Link>
      </div>
      {/* /Affichage conditionnel selon l'état du chargement */}
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : expenses.length === 0 ? (
        <p className="empty-message">Aucune dépense enregistrée.</p>
      ) : (
        //Affichage des dépenses groupées par mois
        Object.entries(grouped).map(([month, monthExpenses]) => {
          const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
          return (
            <div key={month} className="month-group">
              <div className="month-header">
                <strong>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </strong>
                <span className="total">{total.toFixed(2)} €</span>
              </div>
              {/*Liste des dépenses pour le mois*/}
              <ul className="expenses-list">
                {monthExpenses.map((e) => (
                  <li key={e.id} className="expense-row">
                    <div className="expense-info">
                      <span className="expense-name">{e.name}</span>
                      <span className="expense-date">{formatDay(e.date)}</span>
                    </div>
                    <div className="expense-right">
                      <div className="expense-amount">
                        {e.amount < 0
                          ? `−${Math.abs(e.amount)} €`
                          : `-${e.amount} €`}
                      </div>

                      <div className="expense-actions">
                        <Link
                          to={`/expense/edit/${e.id}`}
                          className="edit-btn"
                          title="Modifier"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="delete-btn"
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Expenses;

/*Élément	Rôle
useState / useEffect :	Gérer l’état local et le cycle de vie
axios	Requêtes API sécurisées avec JWT
grouped	Organisation par mois
FaEdit / FaTrash	Icônes de modification et suppression
toast	Feedback utilisateur
Link	Navigation React Route*/
