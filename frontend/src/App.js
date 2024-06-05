// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTranscation';
import AddBudget from './components/AddBudget';
import ViewTransactions from './components/ViewTransactions';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
     
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/add-budget" element={<AddBudget/>} />
            <Route path="/view-transactions" element={<ViewTransactions/>} />
          </Routes>
        
        </BrowserRouter>
  );
}

export default App;
