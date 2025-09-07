import React from "react";
import "./About.css";

import team from "../../assets/about.webp"; 
function About() {
  return (
    <div className="about-page">
      <section className="intro-section">
        <p>
          Spendy, c’est bien plus qu’une appli. C’est votre partenaire pour une
          vie financière plus sereine 💜
        </p>
      </section>

      <section className="vision-section">
        <div className="text-block">
          <h2>Ma vision</h2>
          <p>
            Donner à chacun un outils pour gérer ses finances simplement, à son rythme.
          </p>
        </div>
        <img
          src="https://media.istockphoto.com/id/2151305023/fr/vectoriel/les-entreprises-acc%C3%A8dent-au-succ%C3%A8s-et-au-triomphe-financiers.jpg?s=612x612&w=0&k=20&c=k-9y7qFfcvz_ortl6h2Taj0zDuH88go-RSMhCfgtJhc="
          alt="Finance"
          className="about-img"
        />
      </section>

      <section className="team-section">
        <img src={team} alt="Équipe Spendy" className="about-img round" />
        <div className="text-block">
          <h2>Une développeuse passionnée</h2>
          <p>
            Spendy a été développé dans le cadre de ma soutenance de fin de
            formation en tant que conceptrice développeuse. C’est un projet
            engagé, pensé avec passion pour aider chacun à reprendre le contrôle
            sur ses finances.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
