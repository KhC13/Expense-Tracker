
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useExpense } from "../../context/ExpenseContext.jsx";
import { getCategories, getTheme } from "../../data/categories.js";
import { formatCurrency } from "../../utils/budgetCalculator.js";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

export default function Categories() {
    const { user } = useAuth();
    const { budgets, expenses } = useExpense();

    if (!user?.isSignedUp) {
        return <Navigate to="/" replace />;
    }

    const categories = getCategories(user.studentType);
    const theme = getTheme(user.studentType);

    return (
        <div className="min-h-screen bg-[#0B0D14]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-white">
                        Categories
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        View your category-wise budgets and expenses.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => {
                            const spent = expenses.filter((expense) => {
                                return expense.category === category.name;
                            });

                            const totalSpent = spent.reduce((total, expense) => {
                                return total + expense.amount;
                            }, 0);

                            const budget = budgets[category.id] || 0;
                            const remaining = budget - totalSpent;

                            return (
                                <div
                                    key={category.id}
                                    className="rounded-xl bg-[#141824] p-5"
                                >
                                    <h2 className={`text-lg font-semibold ${theme.text}`}>
                                        {category.name}
                                    </h2>

                                    <p className="mt-4 text-sm text-gray-400">
                                        Allocated Budget
                                    </p>
                                    <p className="text-xl font-bold text-white">
                                        {formatCurrency(budget)}
                                    </p>

                                    <p className="mt-3 text-sm text-gray-400">
                                        Amount Spent
                                    </p>
                                    <p className="text-lg font-semibold text-red-400">
                                        {formatCurrency(totalSpent)}
                                    </p>

                                    <p className="mt-3 text-sm text-gray-400">
                                        Remaining
                                    </p>
                                    <p className={`text-lg font-semibold ${
                                        remaining < 0 ? "text-red-400" : "text-emerald-400"
                                    }`}>
                                        {formatCurrency(remaining)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
