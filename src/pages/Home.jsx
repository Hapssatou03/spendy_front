import { Link } from "react-router-dom"
 import magehomePageSpendy from "../assets/magehomePageSpendy.png" // ajoute ton image ici
 import "../styles/home.css";


 function Home() {
    return (
      <div className="home-wrapper">
        <main className="home-main">
          <div className="home-left">
            <h1>
              Gérer Vos Finances <br />
              facilement
            </h1>
            <p>Une app simple et efficace pour suivre votre budget.</p>
            <Link to="/register" className="btn-start">
              Commencer
            </Link>
          </div>
          <div className="home-right">
            <img src={magehomePageSpendy} alt="Illustration budget" />
          </div>
        </main>
  
        <footer className="home-footer">
          <div className="footer-country">🌐 Pays</div>
          <div className="footer-links">
            <a href="#">Contact</a>
            <span>| Mentions légales |</span>
            <a href="#">Politique de confidentialité</a>
          </div>
        </footer>
      </div>
    );
  }
  
  export default Home;
