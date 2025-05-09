import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/components/header.css";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo à gauche */}
        <Link to="/" className="header-logo-container">
          <img src={logo} alt="Spendy Logo" className="header-logo" />
        </Link>

        {/* Menu uniquement sur la page d’accueil */}
        {isHome && (
          <>
            <nav className="nav-menu">
              <a href="#">Ressources</a>
              <a href="#">Contact</a>
            </nav>

            <div className="header-buttons">
              <a href="/login" className="btn-grey">
                Connexion
              </a>
              <a href="/register" className="btn-orange">
                Inscription
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
