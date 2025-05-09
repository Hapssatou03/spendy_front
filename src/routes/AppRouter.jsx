import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Account from '../pages/Account';
import AddIncome from '../pages/AddIncome'; // ✅ MANQUAIT ICI
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Page d’accueil */}
        <Route path="/" element={<Home />} />

        {/* Compte utilisateur sécurisé */}
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />

        {/* ➕ Formulaire d’ajout de revenu */}
        <Route
          path="/income/add"
          element={isAuthenticated ? <AddIncome /> : <Navigate to="/login" />}
        />

        {/* 404 */}
        <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
