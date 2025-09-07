import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserRoleDonutChart({ users }) {
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const userCount = users.filter((u) => u.role === "USER").length;

  const data = {
    labels: ["Admin", "Utilisateur"],
    datasets: [
      {
        label: "Rôles",
        data: [adminCount, userCount],
        backgroundColor: ["#d63384", "#6f42c1"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14
          }
        }
      }
    }
  };

 return (
  <div className="donut-wrapper">
    <Doughnut data={data} options={options} />
  </div>
);

}
