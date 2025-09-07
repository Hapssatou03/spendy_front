import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  FaChevronDown,
  FaRegMoneyBillAlt,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import ConfidentialityModal from "../../components/ConfidentialityModal";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./account.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Account() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showConfidentialityModal, setShowConfidentialityModal] =
    useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!token) return navigate("/login");

    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://localhost:6415/api/users/me", { headers })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) logout();
        console.error("Erreur utilisateur:", err);
      });

    axios
      .get("http://localhost:6415/api/incomes/me", { headers })
      .then((res) => setIncomes(res.data))
      .catch((err) => console.error("Erreur revenus:", err));

    axios
      .get("http://localhost:6415/api/expenses/me", { headers })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Erreur dépenses:", err));
  }, [token, logout, navigate]);

  const handleEditProfileClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:6415/api/users/me/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Erreur upload:", err);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await axios.delete("http://localhost:6415/api/users/me/avatar", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) => ({ ...prev, avatar: null }));
    } catch (err) {
      console.error("Erreur suppression avatar :", err);
      alert("Impossible de supprimer la photo");
    }
  };
  const handleDeactivateAccount = async () => {
    try {
      await axios.patch(
        "http://localhost:6415/api/users/me/deactivate",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Ton compte a été désactivé. À bientôt !");
      logout();
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la désactivation :", err.response || err);
      alert("Erreur lors de la désactivation du compte");
    }
  };

  if (!user) return <div className="account-loading">Chargement...</div>;

  const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remaining = totalIncome - totalExpenses;

  return (
    <div className="account-page">
      <aside className="sidebar">
        <nav className="sidebar__nav">
          <div className="sidebar__top">
            <Link to="/incomes" className="sidebar__link">
              <FaClipboardList className="sidebar__icon" /> Income
            </Link>
            <Link to="/expenses" className="sidebar__link">
              <FaRegMoneyBillAlt className="sidebar__icon" /> Expenses
            </Link>
          </div>

          <div className="sidebar__dropdown">
            <div
              className="sidebar__link"
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              style={{ cursor: "pointer" }}
            >
              <FaCog className="sidebar__icon" />
              <span>Settings</span>
              <FaChevronDown style={{ marginLeft: "auto" }} />
            </div>

            {showSettingsMenu && (
              <div className="settings-dropdown">
                <button
                  onClick={() => setShowConfidentialityModal(true)}
                  className="dropdown-item"
                >
                  Confidentialité
                </button>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className="dropdown-item"
                  style={{ color: "red" }}
                >
                  Désactiver mon compte
                </button>
              </div>
            )}
            {showConfidentialityModal && (
              <ConfidentialityModal
                onClose={() => setShowConfidentialityModal(false)}
                user={user}
              />
            )}
          </div>
        </nav>
      </aside>

      <div className="account-content">
        <section className="profile-info">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={`http://localhost:6415${user.avatar}`} alt="avatar" />
            ) : (
              <div className="empty-avatar">
                <span>Ajouter une photo</span>
              </div>
            )}
          </div>

          <div className="profile-details">
            <h3 className="profile-name">
              {user.prenom} {user.nom}
            </h3>
            <p className="profile-email">{user.email}</p>
            <div className="profile-buttons">
              <button className="btn-edit" onClick={handleEditProfileClick}>
                Edit profile
              </button>
              {user.avatar && (
                <button className="btn-delete" onClick={handleDeleteAvatar}>
                  Supprimer la photo
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </section>

        <section className="profile-stats">
          <div className="stat-card">
            <div className="stat-card__icon">
              <FaClipboardList />
            </div>
            <div className="stat-card__body">
              <p className="stat-label">Total Income</p>
              <p className="stat-value">${totalIncome.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon">
              <FaRegMoneyBillAlt />
            </div>
            <div className="stat-card__body">
              <p className="stat-label">Total Expenses</p>
              <p className="stat-value">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <section className="expense-graph-wrapper">
          <div className="expense-history">
            <h4>Expense History</h4>
            <div className="table-container">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e, idx) => (
                    <tr key={idx}>
                      <td>{e.date}</td>
                      <td>{e.category?.name || "-"}</td>
                      <td>{e.description}</td>
                      <td
                        className={
                          e.amount < 0 ? "amount-negative" : "amount-positive"
                        }
                      >
                        {e.amount < 0 ? "−" : ""}$
                        {Math.abs(e.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-container">
            <h4>Répartition de vos revenus</h4>
            <Pie
              data={{
                labels: ["Dépenses", "Reste"],
                datasets: [
                  {
                    data: [totalExpenses, Math.max(0, remaining)],
                    backgroundColor: ["#f8bbd0", "#a78bfa"],
                    borderColor: "#fff",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom", labels: { color: "#5b21b6" } },
                },
              }}
            />
            <p
              className={`remaining-amount ${
                remaining >= 0 ? "success" : "warning"
              }`}
            >
              {remaining >= 0 ? (
                <>
                  Il vous reste <strong>{remaining.toFixed(2)} €</strong> après
                  dépenses
                </>
              ) : (
                <>
                  Dépassement de{" "}
                  <strong>{Math.abs(remaining).toFixed(2)} €</strong>
                </>
              )}
            </p>
          </div>
        </section>
      </div>

      {showDeactivateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Es-tu sûr de vouloir désactiver ton compte ?</p>
            <div className="modal-buttons">
              <button
                className="btn-confirm"
                onClick={() => {
                  handleDeactivateAccount();
                  setShowDeactivateModal(false);
                }}
              >
                Oui
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowDeactivateModal(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
