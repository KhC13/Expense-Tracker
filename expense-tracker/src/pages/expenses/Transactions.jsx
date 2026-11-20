function Transactions({ expenses, onDeleteExpense }) {
    return (
        <div>
            <h1>Transactions</h1>
            {expenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id}>
                        <h3>{expense.name}</h3>
                        <p>Amount: ₹{expense.amount}</p>
                        <p>Category: {expense.category}</p>
                        <p>Date: {expense.date.split("-").reverse().join("/")}</p>

                        <button onClick={()=>onDeleteExpense(expense.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
export default Transactions;