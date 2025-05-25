// import
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./Account.css";

// const avatarPlaceholder = "/default-avatar.png";

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
      <div className="account-container">
        <div className="account-left">
          <div className="account-avatar">
            {/* <img
              src={user.profilePicture || avatarPlaceholder}
              alt="Avatar"
              className="avatar-img"
            /> */}
            <label className="upload-label">
             
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="avatar-input"
              />
            </label>
          </div>
          {/* <h3 className="account-name">{user.prenom} {user.nom}</h3> */}
        </div>

        <div className="account-right">
          <h2 className="account-greeting">Bonjour {user.prenom} 👋</h2>

          <div className="account-info">
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Abonnement :</strong> {user.subscription || "Spendy Basic"}</p>
            <p><strong>Ville :</strong> {user.ville || "Non renseignée"}</p>
            <p><strong>Pays :</strong> {user.pays || "Non renseigné"}</p>
            <p><strong>Code postal :</strong> {user.codePostal || "Non renseigné"}</p>
          </div>

          <div className="account-buttons">
            <Link to="/income/add" className="btn-income">➕ Ajouter un revenu</Link>
            <Link to="/expense/add" className="btn-expense">➖ Ajouter une dépense</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
