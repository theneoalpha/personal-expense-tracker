// src/components/AddBudget.js
import React, { useState } from 'react';
import axios from 'axios';

function AddBudget() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const budget = { category, amount };
      await axios.post('http://localhost:5000/budget', budget);
      alert('Budget added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Budget</button>
    </form>
  );
}

export default AddBudget;
