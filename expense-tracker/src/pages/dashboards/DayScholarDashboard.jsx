import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useExpense } from "../../context/ExpenseContext.jsx";
import { dayScholarCategories } from "../../data/categories.js";
import {
  getTotalAllocated,
  getRemaining,
  formatCurrency,
} from "../../utils/budgetCalculator.js";

export default function DayScholarDashboard() {
  const { user } = useAuth();
  const { budgets } = useExpense();

  const allowance = user.monthlyAllowance;
  const allocated = getTotalAllocated(budgets);
  const remaining = getRemaining(allowance, budgets);

  return (
    <div className="min-h-screen bg-[#0B0D14]">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-white">Day Scholar Dashboard</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#141824] p-5">
              <p className="text-sm text-gray-400">Monthly Allowance</p>
              <p className="mt-1 text-2xl font-bold text-white">{formatCurrency(allowance)}</p>
            </div>
            <div className="rounded-xl bg-[#141824] p-5">
              <p className="text-sm text-gray-400">Total Allocated</p>
              <p className="mt-1 text-2xl font-bold text-blue-400">{formatCurrency(allocated)}</p>
            </div>
            <div className="rounded-xl bg-[#141824] p-5">
              <p className="text-sm text-gray-400">Remaining Balance</p>
              <p className={`mt-1 text-2xl font-bold ${remaining < 0 ? "text-red-400" : "text-violet-400"}`}>
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-white">Category Budgets</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dayScholarCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-xl border-l-4 border-violet-500 bg-[#141824] p-5"
              >
                <p className="text-sm text-gray-400">{category.name}</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  {formatCurrency(budgets[category.id] || 0)}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}