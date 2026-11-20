import { useState } from "react";
function AddExpense({onAddExpense}){
    const[name, setName]=useState("");
    const[amount, setAmount]=useState("");
    const[category, setCategory]=useState("");
    const[date, setDate]=useState("");
    
    function handleSubmit(e){
        e.preventDefault();
        if(!name.trim()|| !amount||!category||!date){
            alert("Please fill in all fields")
            return;
        }
        const newExpense={
            id: Date.now(),
            name: name.trim(),
            amount: Number(amount),
            category: category,
            date: date
        };
        onAddExpense(newExpense);
        setName("");
        setAmount("");
        setCategory("");
        setDate("");
    }
    return (
        <div>
            <h1>Add expense</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="expense name" value={name}
                onChange={(e)=>setName(e.target.value)}/>
                
                <input type="number" placeholder="amount" value={amount} 
                onChange={(e)=>setAmount(e.target.value)}/>

                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                <button type="submit">Add expense</button>
            </form>
        </div>
    );
}
export default AddExpense
