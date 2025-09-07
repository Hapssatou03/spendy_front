import React from "react";
import { FaChartLine, FaWallet, FaMoneyBillWave, FaBullseye, FaCamera, FaLock } from "react-icons/fa";
import "./Features.css";

const features = [
  {
    icon: <FaChartLine />, 
    title: "Dashboard intelligent", 
    desc: "Visualisez vos finances en un coup d’œil."
  },
  {
    icon: <FaWallet />, 
    title: "Suivi des dépenses", 
    desc: "Ajoutez et catégorisez vos achats facilement."
  },
  {
    icon: <FaMoneyBillWave />, 
    title: "Revenus", 
    desc: "Enregistrez vos salaires, primes, remboursements, etc."
  },
  {
    icon: <FaBullseye />, 
    title: "Objectifs d’épargne", 
    desc: "Fixez des objectifs et suivez vos progrès."
  },
  {
    icon: <FaCamera />, 
    title: "Scan de factures", 
    desc: "Gagnez du temps avec l’OCR intégré."
  },
  {
    icon: <FaLock />, 
    title: "Sécurité", 
    desc: "Connexion sécurisée avec JWT et cryptage des données."
  },
];

function Features() {
  return (
    <div className="features-page">
      <h1>Fonctionnalités de Spendy</h1>
      <p>Découvrez tout ce que Spendy peut faire pour vous !</p>

      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
