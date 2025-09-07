// Import des hooks React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Import des icônes depuis react-icons
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaLock,
  FaCheck,
} from "react-icons/fa";

import "./register.css";

function Register() {
  // Initialisation des états pour chaque champ du formulaire avec useState (déstructuration du tableau retourné)
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [legalChecked, setLegalChecked] = useState(false); // Checkbox "conditions"
  const [error, setError] = useState(null); // Message d’erreur
  const [loading, setLoading] = useState(false); // Chargement
  const [city, setCity] = useState(""); // Ville
  const [country, setCountry] = useState(""); // Pays
  const [postalCode, setPostalCode] = useState(""); // Code postal

  // Hook pour naviguer vers une autre page (ici vers /login)
  const navigate = useNavigate();

  // Fonction de gestion de l'inscription
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérifie si les conditions légales sont acceptées
    if (!legalChecked) {
      setError("Vous devez accepter les mentions légales.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Requête POST vers l'API d'inscription
      const response = await fetch("http://localhost:6415/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Envoie les données du formulaire en JSON
        body: JSON.stringify({
          prenom,
          nom,
          email,
          password,
          dateNaissance,
          address: {
            ville: city,
            pays: country,
            codePostal: postalCode,
          },
        }),
      });

      // Si la réponse échoue, on lève une erreur personnalisée
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l’inscription.");
      }

      // En cas de succès, redirige vers la page de connexion
      navigate("/login");
    } catch (err) {
      setError(err.message); // Affiche le message d’erreur
    } finally {
      setLoading(false); // Stoppe l’indicateur de chargement
    }
  };

  // Fonction utilitaire pour générer un champ avec icône
  const renderInput = (Icon, placeholder, value, setValue, type = "text") => (
    <div className="input-wrapper">
      <Icon className="input-icon" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );

  // === RENDU DU FORMULAIRE ===
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="title">Inscription</h2>
        <p className="subtitle">Créez un compte et maîtriser vos dépenses.</p>

        {/* Affiche le message d’erreur s’il y en a un */}
        {error && <p className="error-message">{error}</p>}

        {/* Ligne avec prénom et nom côte à côte */}
        <div className="input-row">
          {renderInput(FaUser, "Prénom", prenom, setPrenom)}
          {renderInput(FaUser, "Nom", nom, setNom)}
        </div>

        {/* Autres champs du formulaire */}
        {renderInput(FaEnvelope, "Email", email, setEmail, "email")}
        {renderInput(
          FaCalendarAlt,
          "Date de naissance",
          dateNaissance,
          setDateNaissance,
          "date"
        )}
        {renderInput(FaMapMarkerAlt, "Ville", city, setCity)}
        {renderInput(FaGlobe, "Pays", country, setCountry)}
        {renderInput(FaMapMarkerAlt, "Code postal", postalCode, setPostalCode)}
        {renderInput(FaLock, "Mot de passe", password, setPassword, "password")}
        {renderInput(
          FaLock,
          "Confirmation du mot de passe",
          confirmPassword,
          setConfirmPassword,
          "password"
        )}

        {/* Case à cocher pour les mentions légales */}
        <label className="legal-check">
          <input
            type="checkbox"
            checked={legalChecked}
            onChange={(e) => setLegalChecked(e.target.checked)}
          />
          En cliquant sur S’inscrire, vous acceptez nos{" "}
          <Link to="/conditions" className="link">
            Conditions
          </Link>
        </label>

        {/* Bouton d’envoi du formulaire */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Chargement..." : "S’inscrire"}
        </button>

        {/* Lien vers la page de connexion */}
        <p className="switch-auth">
          Déjà un compte ?{" "}
          <a href="/login" className="link">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
