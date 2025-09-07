import React from "react";
import "./Premium.css";
import premiumImage from "../../assets/imagePremum.jpg"; 
function Premium() {
  return (
    <div className="premium-page">
      <div className="premium-content">
        <div className="premium-text">
          <h1>La Version Premium arrive très bientôt !</h1>
          <p>
            De nouvelles fonctionnalités puissantes pour une expérience plus fluide et complète seront bientôt disponibles.
          </p>
          <p className="highlight">Restez connecté, c’est pour bientôt 💜</p>
        </div>
        <img
          src={premiumImage}
          alt="Illustration premium spendy"
          className="premium-image"
        />
      </div>
    </div>
  );
}

export default Premium;
