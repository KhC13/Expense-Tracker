import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useExpense } from "../../context/ExpenseContext.jsx";
import { getCategories, getTheme } from "../../data/categories.js";
import {
  getSuggestedBudget,
  getTotalAllocated,
  getRemaining,
  formatCurrency,
} from "../../utils/budgetCalculator.js";

export default function BudgetSetup() {
  const { user } = useAuth();
  const { budgets, saveBudgets } = useExpense();
  const navigate = useNavigate();

  const [values, setValues] = useState(() => {
    if (!user?.isSignedUp) return {};
    const suggested = getSuggestedBudget(user.studentType, user.monthlyAllowance);
    const initial = {};
    getCategories(user.studentType).forEach((category) => {
      initial[category.id] = budgets[category.id] ?? suggested[category.id];
    });
    return initial;
  });

  if (!user?.isSignedUp) {
    return <Navigate to="/" replace />;
  }

  const categories = getCategories(user.studentType);
  const theme = getTheme(user.studentType);
  const total = getTotalAllocated(values);
  const remaining = getRemaining(user.monthlyAllowance, values);
  const isOver = remaining < 0;

  const handleChange = (id, value) => {
    setValues({ ...values, [id]: value === "" ? "" : Number(value) });
  };

  const handleReset = () => {
    setValues(getSuggestedBudget(user.studentType, user.monthlyAllowance));
  };

  const handleSave = () => {
    const cleaned = {};
    categories.forEach((category) => {
      cleaned[category.id] = Number(values[category.id] || 0);
    });
    saveBudgets(cleaned);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0D14] px-4 py-10">
      <div className="w-full max-w-lg rounded-xl bg-[#141824] p-6">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Budget Setup</h1>
        <p className="mt-1 text-sm text-gray-400">
          Suggested budgets are filled in. Edit any amount you like.
        </p>

        <div className="mt-4 rounded-lg bg-[#0B0D14] p-4 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Monthly Allowance</span>
            <span>{formatCurrency(user.monthlyAllowance)}</span>
          </div>
          <div className="mt-1 flex justify-between text-gray-300">
            <span>Total Allocated</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div
            className={`mt-1 flex justify-between font-semibold ${
              isOver ? "text-red-400" : theme.text
            }`}
          >
            <span>Remaining</span>
            <span>{formatCurrency(remaining)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between gap-4">
              <label className="text-gray-300">{category.name}</label>
              <input
                type="number"
                min="0"
                value={values[category.id]}
                onChange={(e) => handleChange(category.id, e.target.value)}
                className={`w-32 rounded-lg border border-white/10 bg-[#0B0D14] px-3 py-2 text-right text-white outline-none ${theme.focus}`}
              />
            </div>
          ))}
        </div>

        {isOver && (
          <p className="mt-4 text-sm text-red-400">
            Total allocated is more than your monthly allowance. Please reduce some budgets.
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-lg border border-white/20 py-2 text-gray-300 hover:bg-white/10"
          >
            Reset to Suggested
          </button>
          <button
            onClick={handleSave}
            disabled={isOver}
            className={`flex-1 rounded-lg py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${theme.button}`}
          >
            Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}