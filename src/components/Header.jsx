// Import des outils de navigation et des hooks React
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Import du contexte d'authentification pour accéder à l’utilisateur connecté
import { useAuth } from "../context/AuthContext";

// Import du logo et de l’icône utilisateur
import logo from "../assets/logo.png";
import { FaRegUser } from "react-icons/fa";

// Import du CSS spécifique au header
import "./Header.css";

// Déclaration du composant Header
function Header() {
  const navigate = useNavigate(); // Hook pour rediriger
  const { logout, token, user } = useAuth(); // Accès au token, au user connecté, et à la méthode logout
  const [open, setOpen] = useState(false); // Gère l’ouverture du menu mobile ou dropdown
  const menuRef = useRef(); // Référence pour détecter les clics en dehors du menu

  // === Ferme le menu si l'utilisateur clique à l'extérieur ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour se déconnecter
  const handleLogout = () => {
    logout();       // Supprime le token et remet l'état auth à zéro
    setOpen(false); // Ferme le menu
    navigate("/login"); // Redirige vers la page de login
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* ===== Logo cliquable : redirige vers /account si connecté, sinon / ===== */}
        <Link to={token ? "/account" : "/"} className="header-logo-container">
          <img src={logo} alt="Spendy Logo" className="header-logo" />
        </Link>

        {/* ===== Hamburger menu pour le responsive (mobile) ===== */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* ===== Menu PUBLIC visible si NON connecté ===== */}
        {!token && (
          <>
            {/* Navigation principale (liens vers pages publiques) */}
            <nav className={`nav-menu ${open ? "show-mobile" : ""}`}>
              <Link to="/pricing" onClick={() => setOpen(false)}>Tarifs</Link>
              <Link to="/about" onClick={() => setOpen(false)}>À propos</Link>
            </nav>

            {/* Bouton Connexion */}
            <div className={`header-buttons ${open ? "show-mobile" : ""}`}>
              <Link
                to="/login"
                className="btn-cta"
                onClick={() => setOpen(false)}
              >
                Connexion
              </Link>
            </div>
          </>
        )}

        {/* ===== Menu UTILISATEUR connecté (USER) ===== */}
        {token && user?.role === "USER" && (
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-icon"
              onClick={() => setOpen(!open)}
              aria-label="Menu utilisateur"
              title="Menu utilisateur"
            >
              <FaRegUser />
            </button>

            {/* Dropdown des options utilisateur */}
            {open && (
              <ul className="dropdown">
                <li onClick={() => { setOpen(false); navigate("/account"); }}>Mon Profil</li>
                <li onClick={() => { setOpen(false); navigate("/incomes"); }}>Revenus</li>
                <li onClick={() => { setOpen(false); navigate("/expenses"); }}>Dépenses</li>
                <li onClick={handleLogout}>Se déconnecter</li>
              </ul>
            )}
          </div>
        )}

        {/* ===== Menu ADMIN connecté (ADMIN) ===== */}
        {token && user?.role === "ADMIN" && (
          <div className="admin-menu" ref={menuRef}>
            <button
              className="user-icon"
              onClick={() => setOpen(!open)}
              aria-label="Menu admin"
              title="Menu admin"
            >
              <FaRegUser />
            </button>

            {/* Dropdown admin avec bouton logout */}
            {open && (
              <ul className="dropdown">
                {/* Lien vers le dashboard admin (optionnel) */}
                {/* <li onClick={() => { setOpen(false); navigate("/admin"); }}>Admin Panel</li> */}
                <li onClick={handleLogout}>Se déconnecter</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// Export du composant pour l’utiliser dans l’application
export default Header;
