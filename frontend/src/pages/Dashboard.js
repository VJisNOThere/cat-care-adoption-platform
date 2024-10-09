//Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Import the CSS styles for the Dashboard

const Dashboard = () => {
  // State to hold the count of cats, users, and adoption requests
  const [catCount, setCatCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adoptionRequests, setAdoptionRequests] = useState(0);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState('');

  // useEffect hook to fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch the count of cats, users, and adoption requests from the API
        const catResponse = await axios.get('/api/cats/count');
        const userResponse = await axios.get('/api/users/count');
        const adoptionResponse = await axios.get('/api/adoptions/count');
        
        // Update state with the fetched data
        setCatCount(catResponse.data.count);
        setUserCount(userResponse.data.count);
        setAdoptionRequests(adoptionResponse.data.count);
      } catch (err) {
        // If an error occurs, update the error state
        setError('Error fetching dashboard data');
        console.error(err); // Log the error for debugging
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    fetchDashboardData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs only once on mount

  // Render loading message while data is being fetched
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render the dashboard with the fetched data
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Cats</h2>
          <p>{catCount}</p> {/* Display the count of cats */}
        </div>
        <div className="card">
          <h2>Total Users</h2>
          <p>{userCount}</p> {/* Display the count of users */}
        </div>
        <div className="card">
          <h2>Pending Adoption Requests</h2>
          <p>{adoptionRequests}</p> {/* Display the count of adoption requests */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Export the Dashboard component
