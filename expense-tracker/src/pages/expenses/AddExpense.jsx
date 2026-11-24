
import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getCategories } from "../../data/categories.js";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function AddExpense() {
    const { addExpense } = useExpense();
    const { user } = useAuth();

    const categories = getCategories(user?.studentType);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !amount || !category || !date) {
            alert("Please fill in all fields");
            return;
        }

        if (Number(amount) <= 0) {
            alert("Amount must be greater than zero");
            return;
        }

        const newExpense = {
            id: Date.now(),
            name: name.trim(),
            amount: Number(amount),
            category: category,
            date: date
        };

        addExpense(newExpense);

        setName("");
        setAmount("");
        setCategory("");
        setDate("");

        alert("Expense added successfully!");
    }

    return (
        <div className="min-h-screen bg-[#0B0D14]">
            <Navbar />
            <div className="flex flex-col md:flex-row">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-white">
                        Add Expense
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Keep track of where your money goes
                    </p>

                    <div className="mt-8 max-w-2xl rounded-xl bg-[#141824] p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Expense Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Lunch, Bus fare"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-[#0B0D14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-[#0B0D14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-[#0B0D14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-[#0B0D14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-violet-600 px-4 py-3 font-medium text-white hover:bg-violet-700"
                            >
                                Add Expense
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AddExpense;
