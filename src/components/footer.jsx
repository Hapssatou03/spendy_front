import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2025 Spendy</p>
        <div className="footer-links">
          <Link to="/privacy">Confidentialité</Link>
          <span className="divider">|</span>
          <Link to="/legal">Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
