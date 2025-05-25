import { Link } from "react-router-dom";
import imagehomePageSpendy from "../../assets/imagehomePageSpendy.png";
import iconExpense from "../../assets/icon-expense.png";
import iconSaving from "../../assets/icon-saving.png";
import iconUser from "../../assets/icon-user.png";
import "./home.css";

function Home() {
  return (
    <div className="home-wrapper">
      {/* <header className="home-header">
        <div className="logo">Spendy</div>
        <nav className="home-nav">
          <Link to="#">Fonctionnalités</Link>
          <Link to="#">Tarifs</Link>
          <Link to="#">À propos</Link>
          <Link to="/login" className="btn-filled">Connexion</Link>
        </nav>
      </header> */}

      <main className="home-main">
        <div className="home-left">
          <h1>Votre Alliée Économique</h1>
          <p>Gérez vos Finances en toute simplicité avec spendy</p>
          <Link to="/register" className="btn-start">Inscription</Link>
        </div>
        <div className="home-right">
          <img src={imagehomePageSpendy} alt="Couple heureux gérant ses finances" />
        </div>
      </main>

      <section className="home-features">
        <div className="feature-card">
          <img src={iconExpense} alt="Suivi dépenses" />
          <h3>Suivez vos Dépenses</h3>
          <p>Gardez un œil sur vos dépenses grâce à des outils de suivi détaillés.</p>
        </div>
        <div className="feature-card">
          <img src={iconSaving} alt="Objectif épargne" />
          <h3>Atteignez vos Objectifs d'Épargne</h3>
          <p>Définissez vos objectifs d’épargne et suivez votre progression facilement.</p>
        </div>
        <div className="feature-card">
          <img src={iconUser} alt="Utilisateur secondaire" />
          <h3>Ajoutez un Second Utilisateur</h3>
          <p>Partagez la gestion de vos finances avec un membre de votre famille.</p>
        </div>
      </section>

      <section className="home-cta">
        <h2>Créer un Compte</h2>
        <p>Inscrivez-vous pour commencer et maîtriser vos dépenses</p>
        <Link to="/register" className="btn-start">Inscription</Link>
      </section>

      {/* <footer className="home-footer">
        <p>© 2025 Spendy &nbsp;&nbsp;|&nbsp;&nbsp; <Link to="#">Confidentialité</Link> &nbsp;&nbsp;|&nbsp;&nbsp; <Link to="#">Conditions</Link></p>
      </footer> */}
    </div>
  );
}

export default Home;
