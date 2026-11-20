import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();
const STORAGE_KEY = "campuskhata_budgets";

function loadBudgets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function ExpenseProvider({ children }) {
  const [budgets, setBudgets] = useState(loadBudgets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  const saveBudgets = (newBudgets) => setBudgets(newBudgets);
  const clearBudgets = () => setBudgets({});

  return (
    <ExpenseContext.Provider value={{ budgets, saveBudgets, clearBudgets }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}