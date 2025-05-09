import "../styles/components/Account.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const avatarPlaceholder = "/default-avatar.png";

function Account() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:6415/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("✅ Utilisateur connecté :", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("❌ Erreur chargement user connecté :", err);
      });
  }, [token]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log("📸 Image sélectionnée :", file);
  };

  if (!user) return <p>Chargement du profil...</p>;

  return (
    <div className="account-wrapper">
      <header className="account-header">
        <h2>Hello {user.prenom} <span>👋</span></h2>
      </header>

      <section className="account-card">
        <div className="account-avatar">
          <img
            src={user.profilePicture || avatarPlaceholder}
            alt="Avatar"
            className="avatar-img"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="avatar-input"
          />
        </div>

        <h3 className="account-name">{user.prenom} {user.nom}</h3>

        <div className="account-info">
          <p><strong>Nom :</strong> {user.prenom} {user.nom}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Abonnement :</strong> {user.subscription || "Spendy Basic"}</p>
          <p><strong>Ville :</strong> {user.ville || "Non renseignée"}</p>
          <p><strong>Pays :</strong> {user.pays || "Non renseigné"}</p>
          <p><strong>Code postal :</strong> {user.codePostal || "Non renseigné"}</p>
        </div>

        <Link to="/income/add" className="btn-income">
          ➕ Ajouter un revenu
        </Link>
      </section>
    </div>
  );
}

export default Account;
