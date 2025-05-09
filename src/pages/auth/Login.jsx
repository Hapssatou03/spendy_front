import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AuthSwitcher from "../../components/AuthSwitcher"; // Permet de changer entre login/register
import "../../styles/components/login.css"; //
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Connexion à l'API backend
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6415/api/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      login(token); // Stocke le token + met à jour le contexte utilisateur
      navigate("/account");
;
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="title">Connexion</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
          required
        />

        <button type="submit" className="submit-button">
          Se connecter
        </button>

        <AuthSwitcher />
      </form>
    </div>
  );
}

export default Login;
