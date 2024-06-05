// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/add-transaction">Add Transaction</Link>
      <Link to="/add-budget">Add Budget</Link>
      <Link to="/view-transactions">View Transactions</Link>
    </div>
  );
}


