import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCog, FaChartPie } from "react-icons/fa";
import "./Admin.css";
import UserEditModal from "../../components/UserEditModal";
import UserRoleDonutChart from "../../components/UserRoleDonutChart";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6415/api/users",
        authHeaders
      );
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur chargement utilisateurs", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:6415/api/users/${id}`, authHeaders);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.put(
        `http://localhost:6415/api/users/${id}/toggle-active`,
        {},
        authHeaders
      );
      fetchUsers();
    } catch (err) {
      console.error("Erreur changement statut", err);
    }
  };

  const handleSaveUser = async (updatedUser) => {
    console.log("📡 Envoi PUT pour :", updatedUser);
    try {
      await axios.put(
        `http://localhost:6415/api/users/${updatedUser.id}`,
        updatedUser,
        authHeaders
      );
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      console.error(" Erreur mise à jour", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title-wrapper">
          <h2 className="admin-title">Gestion des utilisateurs</h2>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-users">
          <div className="admin-users">
            <div className="admin-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4">Aucun utilisateur trouvé</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <strong>
                            {user.nom} {user.prenom}
                          </strong>
                        </td>
                        <td>{user.role}</td>
                        <td>{user.active ? "Actif" : "Inactif"}</td>
                        <td>
                          <div className="button-group">
                            <button
                              className="btn-edit"
                              onClick={() => setEditUser(user)}
                            >
                              Modifier
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Supprimer
                            </button>
                            <button
                              className={`btn-toggle ${
                                user.active ? "deactivate" : "reactivate"
                              }`}
                              onClick={() => handleToggleActive(user.id)}
                            >
                              {user.active ? "Désactiver" : "Réactiver"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="admin-stats">
          <h3>Statistiques</h3>
          <div className="chart-placeholder">
            <UserRoleDonutChart users={users} />
            <span>{users.length}</span>
            <small>utilisateurs enregistrés</small>
          </div>
        </div>
      </div>

      {editUser && (
        <UserEditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
