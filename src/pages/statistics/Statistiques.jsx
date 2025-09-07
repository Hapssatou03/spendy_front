import React, { useEffect, useState } from "react";

import axios from "axios";

import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "./Statistiques.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistiques() {
  const [dashboardData, setDashboardData] = useState(null);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [dashRes, catRes] = await Promise.all([
          axios.get("http://localhost:6415/api/dashboard/me", { headers }),
          axios.get(
            "http://localhost:6415/api/dashboard/me/categories-summary",
            { headers }
          ),
        ]);

        setDashboardData(dashRes.data);
        setCategories(catRes.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Erreur lors du chargement des statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = {
    labels: categories.map((cat) => cat.category),
    datasets: [
      {
        data: categories.map((cat) => cat.total),
        backgroundColor: [
          "#e879f9",
          "#818cf8",
          "#f87171",
          "#34d399",
          "#fcd34d",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!dashboardData) return null;

  const { totalIncome, totalExpenses, availableBalance } = dashboardData;

  return (
    <div className="statistiques-page">
      <div className="statistiques-grid">
        <div className="card balance-card">
          <h4>Income vs. Expenses</h4>
          <h2>{availableBalance.toLocaleString()} €</h2>
          <p>Total Balance</p>
          <div className="balance-row">
            <div className="income-amount">
              Income
              <br />
              <strong>{totalIncome.toLocaleString()} €</strong>
            </div>
            <div className="expense-amount">
              Expenses
              <br />
              <strong>{totalExpenses.toLocaleString()} €</strong>
            </div>
          </div>
        </div>

        <div className="card bar-placeholder">
          <h4>Income</h4>
          <p>(Graphique à intégrer ici si besoin)</p>
        </div>

        <div className="card donut-card">
          <h4>Expenses</h4>
          <div className="donut-block">
            <Doughnut data={chartData} />

            <ul className="legend-list">
              {categories.map((cat, index) => (
                <li key={index}>
                  <span
                    className="legend-color"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[
                          index % chartData.datasets[0].backgroundColor.length
                        ],
                    }}
                  ></span>
                  {cat.category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistiques;
