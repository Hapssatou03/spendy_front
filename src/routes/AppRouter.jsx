import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPasswordForm from "../pages/auth/ResetPasswordForm";
import Home from "../pages/home/Home";
import Features from "../pages/features/Features";
import Pricing from "../pages/pricing/Pricing";
import About from "../pages/about/About";
import Terms from "../pages/legal/Terms";
import Privacy from "../pages/legal/Privacy";

import Account from "../pages/account/Account";
import AddIncome from "../pages/income/AddIncome";
import AddExpense from "../pages/expense/AddExpense";
import EditExpense from "../pages/expense/EditExpense";
import Expenses from "../pages/expense/Expenses";
import Incomes from "../pages/income/Incomes";
import EditIncome from "../pages/income/EditIncome";
import Statistiques from "../pages/statistics/Statistiques";

import BudgetPage from "../pages/budget/BudgetPage";

import Premium from "../pages/premium/Premium";

import Header from "../components/Header";
import Footer from "../components/footer";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoute from "../routes/AdminRoute";
function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const shouldHideFooter = location.pathname.startsWith("/account");

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/about" element={<About />} />
        <Route path="/conditions" element={<Terms />} />
        <Route path="/confidentialites" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
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

        <Route
          path="/expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses/add"
          element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense/edit/:id"
          element={isAuthenticated ? <EditExpense /> : <Navigate to="/login" />}
        />

        <Route
          path="/statistiques"
          element={
            isAuthenticated ? <Statistiques /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/budgets"
          element={isAuthenticated ? <BudgetPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<h1>404 - Page non trouvée 😢</h1>} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default AppContent;
