// src/components/Header.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { FaRegUser } from "react-icons/fa";
import "./header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isHome = location.pathname === "/";
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
        <Link to="/" className="header-logo-container">
          <img src={logo} alt="Spendy Logo" className="header-logo" />
          {/* <span className="header-title">Spendy</span> */}
        </Link>

        {isHome ? (
          <>
            <nav className="nav-menu">
              <a href="#">Fonctionnalités</a>
              <a href="#">Tarifs</a>
              <a href="#">À propos</a>
            </nav>

            <div className="header-buttons">
              <Link to="/login" className="btn-cta">Connexion</Link>
            </div>
          </>
        ) : (
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
                <li onClick={() => navigate("/account")}>👤 Mon Profil</li>
                <li onClick={() => navigate("/dashboard")}>📊 Dashboard</li>
                <li onClick={() => navigate("/incomes")}>💸 Revenus</li>
                <li onClick={() => navigate("/expenses")}>🧾 Dépenses</li>
                <li onClick={handleLogout}>🚪 Se déconnecter</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
