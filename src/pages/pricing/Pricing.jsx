import React from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

function Pricing() {
  return (
    <div className="pricing-page">
      <h1 className="pricing-title">Choisissez le plan qui vous convient</h1>
      <p className="pricing-subtitle">Commencez gratuitement, passez à Premium quand vous êtes prêt.</p>

      <div className="pricing-cards">
        {/* Plan Gratuit */}
        <div className="card free">
          <h2>Gratuit</h2>
          <p className="price">0€ / mois</p>
          <ul>
            <li>✅ Suivi des dépenses</li>
            <li>✅ Revenu et épargne</li>
            <li>❌ Scan de factures</li>
            <li>❌ Statistiques avancées</li>
            <li>❌ Support prioritaire</li>
          </ul>
          <Link to="/register" className="btn-outline">
            Créer un compte
          </Link>
        </div>

        {/* Plan Premium */}
        <div className="card premium">
          <h2>Premium</h2>
          <p className="price">4,99€ / mois</p>
          <ul>
            <li>✅ Toutes les fonctionnalités</li>
            <li>✅ Scan de factures par OCR</li>
            <li>✅ Statistiques visuelles</li>
            <li>✅ Synchronisation multi-appareils</li>
            <li>✅ Support prioritaire 24/7</li>
          </ul>
          <Link to="/premium" className="btn-filled">
            Essayer Premium
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
