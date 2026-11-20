import { useState, useEffect } from "react";
import AddExpense from "./pages/expenses/AddExpense";
import Transactions from "./pages/expenses/Transactions";

function App() {
    const [expenses, setExpenses] = useState(() => {
        return JSON.parse(localStorage.getItem("expenses")) || [];
    });

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    function handleAddExpense(newExpense) {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    function handleDeleteExpense(id) {
        setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== id)
        );
    }

    return (
        <div>
            <AddExpense onAddExpense={handleAddExpense} />
            <hr />
            <Transactions
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
            />
        </div>
    );
}
export default App;
