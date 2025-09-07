import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";
import { FaRegUser } from "react-icons/fa";

import "./header.css";

function Header() {
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={token ? "/account" : "/"} className="header-logo-container">
          <img src={logo} alt="Spendy Logo" className="header-logo" />
        </Link>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {!token && (
          <>
            <nav className={`nav-menu ${open ? "show-mobile" : ""}`}>
              <Link to="/pricing" onClick={() => setOpen(false)}>
                Tarifs
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                À propos
              </Link>
            </nav>

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

            {open && (
              <ul className="dropdown">
                <li
                  onClick={() => {
                    setOpen(false);
                    navigate("/account");
                  }}
                >
                  Mon Profil
                </li>
                <li
                  onClick={() => {
                    setOpen(false);
                    navigate("/incomes");
                  }}
                >
                  Revenus
                </li>
                <li
                  onClick={() => {
                    setOpen(false);
                    navigate("/expenses");
                  }}
                >
                  Dépenses
                </li>
                <li onClick={handleLogout}>Se déconnecter</li>
              </ul>
            )}
          </div>
        )}

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

            {open && (
              <ul className="dropdown">
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
