import { getCategories } from "../data/categories.js";

// Suggested budget for each category based on the monthly allowance
export function getSuggestedBudget(studentType, monthlyAllowance) {
  const budget = {};
  getCategories(studentType).forEach((category) => {
    budget[category.id] = Math.round(
      (Number(monthlyAllowance) * category.percent) / 100
    );
  });
  return budget;
}

// Sum of all category budgets
export function getTotalAllocated(budgets) {
  return Object.values(budgets).reduce((sum, value) => sum + Number(value || 0), 0);
}

// Allowance minus allocated budget
export function getRemaining(monthlyAllowance, budgets) {
  return Number(monthlyAllowance) - getTotalAllocated(budgets);
}

export function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}