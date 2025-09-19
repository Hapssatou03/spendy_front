import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2025 Spendy</p>
        <div className="footer-links">
          <Link to="/confidentialites">Confidentialités</Link>
          <span className="divider">|</span>
          <Link to="/conditions">Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
