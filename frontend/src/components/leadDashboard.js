// Dashboard.jsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import PremiumButton from './PremiumButton';

const LeadDashboard = () => {
  // State for leaderboard
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // API endpoints
  const API_BASE_URL = 'http://13.203.206.230:4000';
  const leaderboardUrl = `${API_BASE_URL}/api/premium/leaderboard`;

  // Function to fetch leaderboard data
  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view leaderboard');
        setLeaderboardLoading(false);
        return;
      }

      const response = await fetch(leaderboardUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data = await response.json();
      console.log('Fetched leaderboard data:', data);
      
      if (data.success && Array.isArray(data.leaderboard)) {
        setLeaderboard(data.leaderboard);
        setShowLeaderboard(true);
      } else {
        throw new Error('Invalid leaderboard data format');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error(error.message || 'Failed to fetch leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  // Toggle leaderboard visibility
  const toggleLeaderboard = () => {
    if (!showLeaderboard || leaderboard.length === 0) {
      fetchLeaderboard();
    } else {
      setShowLeaderboard(false);
    }
  };

  return (
    <div className="dashboard-container">
     <ToastContainer position="top-right" />
      
       {/* <div className="dashboard-header">
        <h1>Expense Tracker</h1>
        <PremiumButton />
       </div> */}
      
      <div className="leaderboard-section">
        <button 
          className="leaderboard-btn"
          onClick={toggleLeaderboard}
          disabled={leaderboardLoading}
        >
          {leaderboardLoading ? 'Loading...' : showLeaderboard ? 'Hide Leader Board' : 'Show Leader Board'}
        </button>
        
        {showLeaderboard && leaderboard.length > 0 && (
          <div className="leaderboard-container">
            <h2>Expenses Leaderboard</h2>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Total Expense (₹)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.UserId}>
                    <td>{index + 1}</td>
                    <td>{entry.User?.name || 'Unknown'}</td>
                    <td>{entry.totalExpense.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDashboard;
