 
import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Calendar, Download, Filter, FileText, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import "../styles/ExpenseManagement.css";

const ExpenseManagement = () => {
  // State for storing expenses data
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  
  // UI state variables
  const [filter, setFilter] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showRowOptions, setShowRowOptions] = useState(false);
  
  // Refs for dropdown click-outside detection
  const filterRef = useRef(null);
  const rowOptionsRef = useRef(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage, setExpensesPerPage] = useState(() => {
    // Get user preference from localStorage or default to 10
    const savedPreference = localStorage.getItem('expensesPerPagePreference');
    return savedPreference ? parseInt(savedPreference) : 10;
  });
  
  // Categories with colors for visualization
  const categories = {
    Food: "#FF6B6B",
    Transport: "#4ECDC4",
    Health: "#45B7D1",
    Education: "#FFA62B",
    Salary: "#98D8C8",
    Entertainment: "#FFBE0B",
    Bills: "#5D93E1",
    Other: "#A06CD5"
  };

  // Handle clicks outside of dropdown menus
  useEffect(() => {
    function handleClickOutside(event) {
      // Close filter options when clicking outside
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterOptions(false);
      }
      
      // Close row options when clicking outside
      if (rowOptionsRef.current && !rowOptionsRef.current.contains(event.target)) {
        setShowRowOptions(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch expenses data from API
  useEffect(() => {
    async function fetchExpenses() {
      // Get authentication token
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // Make API request
        const response = await fetch("http://13.203.206.230:4000/api/expenses/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if request was successful
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Parse and store response data
        const data = await response.json();
        setExpenses(data.expenses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError(`Failed to load expenses: ${error.message}`);
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  // Apply filters to the expenses list
  useEffect(() => {
    function filterExpenses() {
      const today = new Date();
      let filtered = [];

      // Filter based on time period
      switch (filter) {
        case "daily":
          // Filter expenses from today
          filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.createdAt);
            return expenseDate.toDateString() === today.toDateString();
          });
          break;
          
        case "weekly":
          // Filter expenses from this week
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          
          filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.createdAt);
            return expenseDate >= startOfWeek;
          });
          break;
          
        case "monthly":
          // Filter expenses from this month
          filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.createdAt);
            return (
              expenseDate.getMonth() === today.getMonth() &&
              expenseDate.getFullYear() === today.getFullYear()
            );
          });
          break;
          
        case "yearly":
          // Filter expenses from this year
          filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.createdAt);
            return expenseDate.getFullYear() === today.getFullYear();
          });
          break;
          
        default:
          // No filter, show all expenses
          filtered = expenses;
      }

      // Update filtered expenses state
      setFilteredExpenses(filtered);
      // Reset to first page when filter changes
      setCurrentPage(1);
    }

    filterExpenses();
  }, [filter, expenses]);

  // Calculate total amount of filtered expenses
  useEffect(() => {
    const total = filteredExpenses.reduce((sum, expense) => {
      return sum + (parseFloat(expense.amount) || 0);
    }, 0);
    
    setTotalAmount(total);
  }, [filteredExpenses]);

  // Save user preference for expenses per page
  useEffect(() => {
    localStorage.setItem('expensesPerPagePreference', expensesPerPage.toString());
  }, [expensesPerPage]);
  
  // Delete expense function
  const handleDeleteExpense = async (expenseId) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Authentication token not found");
      return;
    }
 
    try {
      // Log attempt to delete
      console.log(`Attempting to delete expense with ID: ${expenseId}`);
      
      // API endpoint for deletion
      const apiUrl = `http://13.203.206.230:4000/api/expenses/delete/${expenseId}`;
      console.log(`Using API URL: ${apiUrl}`);
      
      // Send delete request
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Log response status
      console.log(`Delete response status: ${response.status}`);
      
      // Check if request was successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server error response: ${errorText}`);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Update UI after successful deletion
      updateUIAfterDelete(expenseId);
      
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError(`Failed to delete expense: ${error.message}`);
    }
  };
  
  // Update UI after expense deletion
  const updateUIAfterDelete = (expenseId) => {
    // Remove expense from both expense states
    setExpenses(prevExpenses => 
      prevExpenses.filter(expense => expense.id !== expenseId)
    );
    
    setFilteredExpenses(prevFiltered => 
      prevFiltered.filter(expense => expense.id !== expenseId)
    );
    
    // Recalculate pagination if needed
    const updatedFilteredExpenses = filteredExpenses.filter(expense => expense.id !== expenseId);
    const newTotalPages = Math.ceil(updatedFilteredExpenses.length / expensesPerPage);
    
    // Adjust current page if necessary
    if (currentPage > newTotalPages && currentPage > 1) {
      setCurrentPage(newTotalPages || 1);
    }
    
    // Reset error state
    setError(null);
  };

  // Change number of rows shown per page
  const changeRowsPerPage = (value) => {
    setExpensesPerPage(value);
    setCurrentPage(1); // Reset to first page
    setShowRowOptions(false);
  };

  // Calculate pagination indexes
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  // Change to specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get color based on expense category
  const getCategoryColor = (category) => {
    return categories[category] || categories.Other;
  };

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format amount with 2 decimal places
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get human-readable label for current filter
  const getFilterLabel = () => {
    switch (filter) {
      case "daily": return "Today's Expenses";
      case "weekly": return "This Week's Expenses";
      case "monthly": return "This Month's Expenses";
      case "yearly": return "This Year's Expenses";
      default: return "All Expenses";
    }
  };

  // Download expenses as CSV file
  const downloadCSV = () => {
    // Create CSV headers
    const headers = ["Date,Description,Category,Amount\n"];
    
    // Create CSV rows from filtered expenses
    const rows = filteredExpenses.map(expense => 
      `${formatDate(expense.createdAt)},${expense.description.replace(/,/g, ' ')},${expense.category},${expense.amount}\n`
    );
    
    // Combine headers and rows
    const csvContent = headers.concat(rows).join('');
    
    // Create blob from CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${filter}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate page buttons for pagination
  const getPageButtons = () => {
    const maxButtonsToShow = 5;
    const buttons = [];
    
    if (totalPages <= maxButtonsToShow) {
      // Show all page buttons if total pages are less than max buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Always show first page button
      buttons.push(1);
      
      // Calculate start and end of page buttons to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust start and end to always show 3 pages
      if (startPage === 2) endPage = Math.min(totalPages - 1, startPage + 2);
      if (endPage === totalPages - 1) startPage = Math.max(2, endPage - 2);
      
      // Add ellipsis before middle pages if needed
      if (startPage > 2) buttons.push('...');
      
      // Add middle page buttons
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) buttons.push('...');
      
      // Always show last page button
      buttons.push(totalPages);
    }
    
    return buttons;
  };

  return (
    <div className="expense-container">
      {/* Header section with title and filtering options */}
      <div className="expense-header">
        <div className="expense-title">
          <Calendar className="calendar-icon" />
          <h1>Day to Day Expenses</h1>
        </div>
        
        <div className="expense-controls">
          {/* Filter dropdown */}
          <div className="dropdown-container" ref={filterRef}>
            <button 
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="dropdown-button"
            >
              <div className="button-content">
                <Filter className="button-icon" />
                <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              </div>
              <ArrowDown className="arrow-icon" />
            </button>
            
            {showFilterOptions && (
              <div className="dropdown-menu">
                {["daily", "weekly", "monthly", "yearly"].map((option) => (
                  <button
                    key={option}
                    className={`dropdown-item ${filter === option ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(option);
                      setShowFilterOptions(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Rows per page dropdown */}
          <div className="dropdown-container" ref={rowOptionsRef}>
            <button 
              onClick={() => setShowRowOptions(!showRowOptions)}
              className="dropdown-button"
            >
              <div className="button-content">
                <Settings className="button-icon" />
                <span>{expensesPerPage} rows</span>
              </div>
              <ArrowDown className="arrow-icon" />
            </button>
            
            {showRowOptions && (
              <div className="dropdown-menu">
                {[2, 5, 10].map((option) => (
                  <button
                    key={option}
                    className={`dropdown-item ${expensesPerPage === option ? 'active' : ''}`}
                    onClick={() => changeRowsPerPage(option)}
                  >
                    {option} rows
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Download CSV button */}
          <button 
            onClick={downloadCSV}
            className="download-button"
          >
            <Download className="button-icon" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Summary section */}
      <div className="expense-summary">
        <h2 className="summary-title">
          <FileText className="summary-icon" />
          {getFilterLabel()}
        </h2>
        
        <div className="summary-stats">
          <p className="summary-count">
            <span className="highlight">{filteredExpenses.length}</span> transactions found
          </p>
          <p className="summary-total">
            Total: {formatAmount(totalAmount)}
          </p>
        </div>
      </div>

      {/* Loading, error, and empty states */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : filteredExpenses.length === 0 ? (
        <div className="empty-message">
          <p>No expenses found for this period</p>
        </div>
      ) : (
        <>
          {/* Expenses table */}
          <div className="table-container">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th className="amount-column">Amount</th>
                  <th className="actions-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((expense, index) => (
                  <tr 
                    key={expense.id || index} 
                    className="expense-row"
                  >
                    <td className="date-cell">{formatDate(expense.createdAt)}</td>
                    <td className="description-cell">{expense.description}</td>
                    <td className="category-cell">
                      <span 
                        className="category-badge"
                        style={{ 
                          backgroundColor: `${getCategoryColor(expense.category)}20`,
                          color: getCategoryColor(expense.category)
                        }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="amount-cell">{formatAmount(expense.amount)}</td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="delete-button"
                        aria-label={`Delete expense ${expense.description}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Show empty rows to maintain consistent pagination layout */}
                {currentExpenses.length < expensesPerPage && Array(expensesPerPage - currentExpenses.length).fill(0).map((_, index) => (
                  <tr key={`empty-${index}`} className="empty-row">
                    <td colSpan="5"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {indexOfFirstExpense + 1} to {Math.min(indexOfLastExpense, filteredExpenses.length)} of {filteredExpenses.length} entries
              </div>
              <div className="pagination-controls">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  <ChevronLeft className="arrow-icon" />
                </button>
                
                {getPageButtons().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                  <ChevronRight className="arrow-icon" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseManagement;
