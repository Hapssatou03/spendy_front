import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import "./login.css";
import loginIllustration from "../../assets/login-illustration.png";

import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const isExpired = location.state?.expired;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:6415/api/auth/login",
        { email, password }
      );

      const { token, user } = response.data;

      login(token, user);

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (err) {
      console.error(err);

      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-image">
          <img src={loginIllustration} alt="Femme utilisant son téléphone" />
        </div>

        <form className="login-form-new" onSubmit={handleLogin}>
          <h1>Connectez-vous</h1>
          <p className="subtitle">
            Gérer vos finances n’a jamais été aussi simple.
          </p>

          {isExpired && (
            <div className="text-red-500 mb-4">
              Votre session a expiré. Veuillez vous reconnecter.
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <div className="input-wrapper">
            <span className="input-icon-box">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-wrapper">
            <span className="input-icon-box">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            <Link to="/reset-password" className="forgot-password">
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className="btn-login">
            Connexion
          </button>

          <p className="register-link">
            Pas de compte ? <Link to="/register">Inscrivez-vous</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
