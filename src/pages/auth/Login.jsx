import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
import loginIllustration from "../../assets/login-illustration.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6415/api/auth/login", {
        email,
        password,
      });
      login(response.data.token);
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      

      <div className="login-content">
        <div className="login-image">
          {/* Remplacez le chemin par l'image appropriée */}
          <img src={loginIllustration} alt="Femme utilisant son téléphone" />

       
        </div>

        <form className="login-form-new" onSubmit={handleLogin}>
          <h1>Connectez-vous à votre compte</h1>
          <p className="subtitle">
            Gérer vos finances n’a jamais été aussi simple. Reprenez le contrôle.
          </p>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="checkbox-row">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>

          <button type="submit" className="btn-login">Connexion</button>

          <p className="register-link">
            Pas de compte ? <a href="#">Inscrivez-vous</a>
          </p>
        </form>
      </div>

      
    </div>
  );
}

export default Login;
