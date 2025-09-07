//  Pour rediriger vers une autre page (si non autorisé)
import { Navigate } from "react-router-dom";

//  Import du contexte d'authentification global
import { useAuth } from "../context/AuthContext";

// Composant qui protège les routes réservées aux administrateurs
const AdminRoute = ({ children }) => {
  // Récupération de l'état de connexion et de l'utilisateur courant
  const { isAuthenticated, user } = useAuth();

  // Vérifie si l'utilisateur est connecté ET a le rôle ADMIN
  const isAdmin = isAuthenticated && user?.role === "ADMIN";

  // Si c'est un admin → accès à la page
  // Sinon → redirection vers la page d'accueil
  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
