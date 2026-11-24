import AddExpense from "./pages/expenses/AddExpense.jsx";
import Transactions from "./pages/expenses/Transactions.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { useExpense } from "./context/ExpenseContext.jsx";
import BudgetManagement from "./pages/budget/BudgetManagement.jsx";
import Landing from "./pages/onboarding/Landing.jsx";
import StudentType from "./pages/onboarding/StudentType.jsx";
import Signup from "./pages/onboarding/Signup.jsx";
import BudgetSetup from "./pages/onboarding/BudgetSetup.jsx";
import DayScholarDashboard from "./pages/dashboards/DayScholarDashboard.jsx";
import HostellerDashboard from "./pages/dashboards/HostellerDashboard.jsx";
import Categories from "./pages/budget/Categories.jsx";
function Dashboard() {
  const { user } = useAuth();
  const { budgets } = useExpense();

  if (!user || !user.isSignedUp) return <Navigate to="/" replace />;
  if (Object.keys(budgets).length === 0) {
    return <Navigate to="/budget-setup" replace />;
  }

  return user.studentType === "hosteller" ? (
    <HostellerDashboard />
  ) : (
    <DayScholarDashboard />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/categories" element={<Categories />} />
      <Route path="/budget-management" element={<BudgetManagement />} />
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/" element={<Landing />} />
      <Route path="/student-type" element={<StudentType />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/budget-setup" element={<BudgetSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}