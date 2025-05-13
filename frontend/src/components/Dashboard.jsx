// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PremiumButton from './PremiumButton';

const Dashboard = () => {
  // State for expenses and form
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food'
  });
  const [editing, setEditing] = useState(null);

  // API endpoints
  const API_BASE_URL = 'http://localhost:4000';
  const addExpenseUrl = `${API_BASE_URL}/api/expenses/add`;
  const getExpensesUrl = `${API_BASE_URL}/api/expenses/all`;
  const deleteExpenseUrl = `${API_BASE_URL}/api/expenses/delete`;
  const updateExpenseUrl = `${API_BASE_URL}/api/expenses/update`;

  // Categories
  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other'];

  // Fetch expenses when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Function to fetch expenses
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        toast.error('Please login to view expenses');
        return;
      }

      const response = await fetch(getExpensesUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      console.log('Fetched expenses data:', data);
      
      // Handle both direct array and nested object formats
      if (Array.isArray(data)) {
        setExpenses(data);
      } else if (data.expenses && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      } else {
        setExpenses([]);
        console.warn('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to load expenses');
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
  };

  // Handle form submission (add or update expense)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add expenses');
        return;
      }

      const expenseData = {
        description: newExpense.description,
        amount: Number(newExpense.amount),
        category: newExpense.category
      };

      let response;
      
      if (editing) {
        // Update existing expense
        response = await fetch(`${updateExpenseUrl}/${editing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(expenseData)
        });
        
        if (response.ok) {
          toast.success('Expense updated successfully');
        }
      } else {
        // Add new expense
        response = await fetch(addExpenseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(expenseData)
        });
        
        if (response.ok) {
          toast.success('Expense added successfully');
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      // Reset form and fetch updated expenses
      setNewExpense({
        description: '',
        amount: '',
        category: 'Food'
      });
      setEditing(null);
      await fetchExpenses(); // Important: Refetch expenses after adding/updating
    } catch (error) {
      console.error('Error saving expense:', error);
      toast.error(error.message || 'Failed to save expense');
    }
  };

  // Handle expense deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete expenses');
        return;
      }

      const response = await fetch(`${deleteExpenseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      toast.success('Expense deleted successfully');
      fetchExpenses(); // Refetch expenses after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  // Handle editing an expense
  const handleEdit = (expense) => {
    setNewExpense({
      description: expense.description,
      amount: expense.amount,
      category: expense.category
    });
    setEditing(expense);
  };

  // Cancel editing
  const handleCancel = () => {
    setNewExpense({
      description: '',
      amount: '',
      category: 'Food'
    });
    setEditing(null);
  };

  return (
    <div className="dashboard-container">
      <ToastContainer position="top-right" />
      
      <div className="dashboard-header">
        <h1>Expense Tracker</h1>
        <PremiumButton />
      </div>
      
      <div className="add-expense-form">
        <h2>{editing ? 'Edit Expense' : 'Add New Expense'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newExpense.description || ''}
              onChange={handleInputChange}
              placeholder="Enter description"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newExpense.amount || ''}
              onChange={handleInputChange}
              placeholder="Enter amount"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={newExpense.category || 'Food'}
              onChange={handleInputChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editing ? 'Update Expense' : 'Add Expense'}
            </button>
            
            {editing && (
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="expenses-list">
        <h2>Your Expenses</h2>
        {loading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found. Add your first expense above!</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(expenses) && expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>₹{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;