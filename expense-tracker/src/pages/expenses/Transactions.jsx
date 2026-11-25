
import { useExpense } from "../../context/ExpenseContext.jsx";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function Transactions() {
    const { expenses, deleteExpense } = useExpense();

    return (
        <div className="min-h-screen bg-[#0B0D14]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 p-6 sm:p-8">

                    <h1 className="text-2xl font-bold text-white">
                        Transactions
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        View and manage all your expenses.
                    </p>

                    <div className="mt-8 space-y-4">

                        {expenses.length === 0 ? (
                            <div className="rounded-xl bg-[#141824] p-8 text-center">
                                <p className="text-gray-400">
                                    No expenses added yet.
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Add your first expense to see it here.
                                </p>
                            </div>
                        ) : (
                            expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="rounded-xl bg-[#141824] p-5"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">

                                        <h3 className="text-lg font-semibold text-white">
                                            {expense.name}
                                        </h3>

                                        <p className="text-xl font-bold text-white">
                                            ₹{expense.amount}
                                        </p>

                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                                        <p className="text-sm text-violet-400">
                                            {expense.category}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {expense.date.split("-").reverse().join("/")}
                                        </p>

                                    </div>

                                    <div className="mt-4 border-t border-white/10 pt-3 flex justify-end">

                                        <button
                                            onClick={() => deleteExpense(expense.id)}
                                            className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
export default Transactions;
