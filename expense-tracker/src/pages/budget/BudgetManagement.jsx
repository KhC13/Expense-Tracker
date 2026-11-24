import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useExpense } from "../../context/ExpenseContext.jsx";
import { getCategories, getTheme } from "../../data/categories.js";
import {
    getTotalAllocated,
    formatCurrency,
} from "../../utils/budgetCalculator.js";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function BudgetManagement() {
    const { user } = useAuth();
    const { budgets, saveBudgets, expenses } = useExpense();

    const categories = user?.studentType
        ? getCategories(user.studentType)
        : [];

    const theme = getTheme(user?.studentType);

    const [values, setValues] = useState(() => ({ ...budgets }));

    if (!user?.isSignedUp) {
        return <Navigate to="/" replace />;
    }

    const totalSpent = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    const totalAllocated = getTotalAllocated(values);

    const remainingBalance = user.monthlyAllowance - totalSpent;

    const handleChange = (id, value) => {
        setValues({
            ...values,
            [id]: value === "" ? "" : Number(value),
        });
    };

    const handleSave = () => {
        const updatedBudgets = {};

        categories.forEach((category) => {
            updatedBudgets[category.id] = Number(values[category.id] || 0);
        });

        saveBudgets(updatedBudgets);
        alert("Budget updated successfully!");
    };

    return (
        <div className="min-h-screen bg-[#0B0D14]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-white">
                        Budget Management
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Manage your monthly budget and track your spending.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-[#141824] p-5">
                            <p className="text-sm text-gray-400">Monthly Allowance</p>
                            <h2 className="mt-2 text-2xl font-bold text-white">
                                {formatCurrency(user.monthlyAllowance)}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-[#141824] p-5">
                            <p className="text-sm text-gray-400">Total Spent</p>
                            <h2 className="mt-2 text-2xl font-bold text-red-400">
                                {formatCurrency(totalSpent)}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-[#141824] p-5">
                            <p className="text-sm text-gray-400">Remaining Balance</p>
                            <h2 className={`mt-2 text-2xl font-bold ${
                                remainingBalance < 0 ? "text-red-400" : "text-violet-400"
                            }`}>
                                {formatCurrency(remainingBalance)}
                            </h2>
                        </div>
                    </div>

                    <h2 className="mt-8 text-lg font-semibold text-white">
                        Category Budgets
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Total Allocated: {formatCurrency(totalAllocated)}
                    </p>

                    <div className="mt-4 space-y-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between gap-4 rounded-xl bg-[#141824] p-4"
                            >
                                <label className="text-gray-300">
                                    {category.name}
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={values[category.id] ?? ""}
                                    onChange={(e) =>
                                        handleChange(category.id, e.target.value)
                                    }
                                    className={`w-32 rounded-lg border border-white/10 bg-[#0B0D14] px-3 py-2 text-right text-white outline-none ${theme.focus}`}
                                />
                            </div>
                        ))}
                    </div>

                    {totalAllocated > user.monthlyAllowance && (
                        <p className="mt-4 text-sm text-red-400">
                            Your allocated budget exceeds your monthly allowance.
                        </p>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={totalAllocated > user.monthlyAllowance}
                        className={`mt-6 rounded-lg px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${theme.button}`}
                    >
                        Save Budget
                    </button>
                </main>
            </div>
        </div>
    );
}
export default BudgetManagement;

