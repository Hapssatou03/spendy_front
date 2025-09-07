import { useState } from "react";
import axios from "axios";
import "./resetPassword.css";
import { FaEnvelope } from "react-icons/fa";

function ResetPasswordForm() {
 
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMessage(""); 
    setError("");

    try {
      
      await axios.post(
        "http://localhost:6415/api/auth/reset-password-request",
        {
          email,
        }
      );
      
      setMessage("Un email de réinitialisation a été envoyé.");
    
    } catch (err) {
      setError("Email non trouvé ou erreur serveur.");
    }
  };

  return (
    <div className="reset-page">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h1>Mot de passe oublié ?</h1>
        <p className="subtitle">
          Entrez votre adresse email, nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="input-wrapper">
          <span className="input-icon-box">
            <FaEnvelope />
          </span>
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn-reset">
          Envoyer le lien
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;

