// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import Account from "../pages/account/Account";
import AddIncome from "../pages/income/AddIncome";
import AddExpense from "../pages/expense/AddExpense";
import EditExpense from "../pages/expense/EditExpense";
import Expenses from "../pages/expense/Expenses";
import Incomes from "../pages/income/Incomes";
import EditIncome from "../pages/income/EditIncome";

//  Composants
import Header from "../components/Header";
import Footer from "../components/footer";

// Contexte d’authentification
import { useAuth } from "../context/AuthContext";

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Accueil publique */}
        <Route path="/" element={<Home />} />

        {/* Profil */}
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />

        {/* Revenu */}
        <Route
          path="/incomes"
          element={isAuthenticated ? <Incomes /> : <Navigate to="/login" />}
        />
        <Route
          path="/income/add"
          element={isAuthenticated ? <AddIncome /> : <Navigate to="/login" />}
        />
        <Route
          path="/income/edit/:id"
          element={isAuthenticated ? <EditIncome /> : <Navigate to="/login" />}
        />

        {/* Dépenses */}
        <Route
          path="/expense/add"
          element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense/edit/:id"
          element={isAuthenticated ? <EditExpense /> : <Navigate to="/login" />}
        />
        {/* 404 */}
        <Route path="*" element={<h1>404 - Page non trouvée 😢</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
