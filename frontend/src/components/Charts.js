
 

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { jwtDecode } from "jwt-decode";

const ExpensePieChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      
      labels: [],
      colors: ["#FF4560", "#008FFB", "#00E396", "#FEB019", "#775DD0"],
      legend: {
        position: "bottom"
      },

      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val.toFixed(1) + "%";
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    tokenExists: false,
    tokenContent: null,
    apiResponse: null,
    userExpensesCount: 0,
    nonZeroCategories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // STEP 1: Check token
        const token = localStorage.getItem("token");
        setDebugInfo(prev => ({...prev, tokenExists: !!token}));
        
        if (!token) {
          console.error("Token not found");
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        try {
          // STEP 2: Decode token and find user ID
          const decodedToken = jwtDecode(token);
          setDebugInfo(prev => ({...prev, tokenContent: decodedToken}));
          
          // Look for user ID in various possible fields
          let userId = null;
          
          // Common field names for user ID in JWT tokens
          const possibleIdFields = [
            'userId', 'UserId', 'user_id', 'id', 'sub', '_id', 
            'user', 'userID', 'user_ID', 'uid', 'userIdentifier'
          ];
          
          // Try to find a user ID field
          for (const field of possibleIdFields) {
            if (decodedToken[field]) {
              userId = decodedToken[field];
              console.log(`Found user ID in field: ${field}`);
              break;
            }
          }
          
          // If we still don't have a user ID, check if there's an obvious numeric ID
          if (!userId) {
            // Inspect all fields in the decoded token
            Object.keys(decodedToken).forEach(key => {
              // Look for fields that might contain user info
              if (typeof decodedToken[key] === 'string' || typeof decodedToken[key] === 'number') {
                console.log(`Potential ID field: ${key} = ${decodedToken[key]}`);
                
                // If this is the first numeric/string field we find, use it as a fallback
                if (!userId) {
                  userId = decodedToken[key];
                }
              }
            });
          }
          
          if (!userId) {
            // Last resort: Just use first user or don't filter by user
            console.log("No user ID found, will try fetching all expenses");
          }
          
          setDebugInfo(prev => ({...prev, userId: userId}));
        } catch (tokenError) {
          console.error("Error decoding token:", tokenError);
          console.log("Raw token:", token);
          setError("Invalid authentication token");
          setLoading(false);
          return;
        }

        // STEP 3: Fetch expenses data
        try {
          const response = await fetch("http://localhost:4000/api/expenses/all", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
          }

          const data = await response.json();
          setDebugInfo(prev => ({...prev, apiResponse: data}));
          
          // STEP 4: Process expenses
          if (!data.expenses || !Array.isArray(data.expenses)) {
            setError("Invalid data format from API");
            setLoading(false);
            return;
          }
          
          // Just use all expenses if we couldn't find a user ID
          let userExpenses = data.expenses;
          
          setDebugInfo(prev => ({...prev, userExpensesCount: userExpenses.length}));
          
          // Define fixed categories
          const categories = ["food", "transport", "entertainment", "bills", "other"];
          
          // Group expenses by category
          const categoryMap = {};
          categories.forEach(cat => {
            categoryMap[cat] = 0;
          });

          // STEP 5: Process expenses data
          userExpenses.forEach(expense => {
            // Check if category exists and if amount is valid
            if (expense.category && expense.amount) {
              const category = expense.category.toLowerCase();
              if (categories.includes(category)) {
                categoryMap[category] += Number(expense.amount);
              } else {
                categoryMap["other"] += Number(expense.amount);
              }
            }
          });

          // STEP 6: Prepare data for chart
          const nonZeroCategories = Object.keys(categoryMap).filter(
            category => categoryMap[category] > 0
          );
          
          setDebugInfo(prev => ({...prev, nonZeroCategories}));
          
          const labels = nonZeroCategories.map(cat => 
            cat.charAt(0).toUpperCase() + cat.slice(1)
          );
          
          const series = nonZeroCategories.map(category => categoryMap[category]);

          // Only update chart if we have data
          if (series.length > 0) {
            setChartData({
              series: series,
              options: {
                ...chartData.options,
                labels: labels,
              },
            });
          }
        } catch (apiError) {
          console.error("API error:", apiError);
          setError(`API error: ${apiError.message}`);
          setLoading(false);
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // For testing/debugging purpose
  const useDefaultData = () => {
    const defaultSeries = [350, 200, 150, 250, 50];
    const defaultLabels = ["Food", "Transport", "Entertainment", "Bills", "Other"];
    
    setChartData({
      series: defaultSeries,
      options: {
        ...chartData.options,
        labels: defaultLabels,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col">
        <div>Loading expense data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col">
        <p style={{ color: 'red' }}>{error}</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={useDefaultData} style={{ padding: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Use Demo Data
          </button>
        </div>
        <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    );
  }

  if (chartData.series.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col">
        <p>No expense data found</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={useDefaultData} style={{ padding: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Use Demo Data
          </button>
        </div>
        <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col w-full py-8">
      <h2 className="text-2xl font-bold mb-6">EXPENSES CHARTS</h2>
      <div className="w-full max-w-lg flex justify-center">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width="380"
        />
      </div>
    </div>
  );
};

export default ExpensePieChart;
