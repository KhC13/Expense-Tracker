import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

const BUDGET_KEY = "campuskhata_budgets";
const EXPENSE_KEY = "expenses";

function loadData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
        return {};
    }
}

export function ExpenseProvider({ children }) {
    const [budgets, setBudgets] = useState(() => loadData(BUDGET_KEY));
    const [expenses, setExpenses] = useState(() => {
        const data = loadData(EXPENSE_KEY);
        return Array.isArray(data) ? data : [];
    });

    useEffect(() => {
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
    }, [budgets]);

    useEffect(() => {
        localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
    }, [expenses]);

    const saveBudgets = (newBudgets) => {
        setBudgets(newBudgets);
    };

    const clearBudgets = () => {
        setBudgets({});
    };

    const addExpense = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense]);
    };

    const deleteExpense = (id) => {
        setExpenses((prev) =>
            prev.filter((expense) => expense.id !== id)
        );
    };
    return (
        <ExpenseContext.Provider
            value={{
                budgets,
                saveBudgets,
                clearBudgets,
                expenses,
                addExpense,
                deleteExpense
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
}
export function useExpense() {
    return useContext(ExpenseContext);
}
