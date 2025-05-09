import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/components/register.css";

function Register() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [legalChecked, setLegalChecked] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!legalChecked) {
      setError("Vous devez accepter les mentions légales.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:6415/api/auth/register", {
        prenom,
        nom,
        email,
        dateNaissance,
        telephone,
        password,
        address: {
          ville: city,
          pays: country,
          codePostal: postalCode
        }
      });

      console.log("✅ Inscription réussie :", response.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Erreur d’inscription :", err);
      setError(err.response?.data?.message || "Erreur lors de l’inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="title">Inscription</h2>

        {error && <p className="error-message">{error}</p>}

        <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="date" placeholder="Date de naissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required />
        <input type="tel" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />

        <input type="text" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="text" placeholder="Pays" value={country} onChange={(e) => setCountry(e.target.value)} required />
        <input type="text" placeholder="Code postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}"
          title="Minimum 8 caractères, avec au moins une majuscule, une minuscule et un chiffre"
        />

        <input
          type="password"
          placeholder="Confirmation du mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label className="legal-check">
          <input type="checkbox" checked={legalChecked} onChange={(e) => setLegalChecked(e.target.checked)} />
          En cliquant sur S’inscrire, vous acceptez nos{" "}
          <a href="#" className="link">Conditions</a>
        </label>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Chargement..." : "Inscription"}
        </button>

        <p className="switch-auth">
          Déjà un compte ?{" "}
          <a href="/login" className="link">
            Connecte-toi
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
