
import { useState } from "react";

function BudgetManagement({ expenses }) {

    const [monthlyAllowance, setMonthlyAllowance] = useState("");

    const totalSpent = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    const remainingBalance = Number(monthlyAllowance) - totalSpent;

    return (
        <div>
            <h1>Budget Management</h1>

            <label>Monthly Allowance (₹)</label>

            <input
                type="number"
                placeholder="Enter your monthly allowance"
                value={monthlyAllowance}
                onChange={(e) => setMonthlyAllowance(e.target.value)}
            />
            <h3>Monthly Allowance: ₹{monthlyAllowance || 0}</h3>
            <h3>Total Spent: ₹{totalSpent}</h3>
            <h3>Remaining Balance: ₹{remainingBalance}</h3>
        </div>
    );
}

export default BudgetManagement;
