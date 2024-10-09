//Login.js

import React, { useState } from 'react'; // Importing React and useState hook
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import '../styles/Login.css'; // Importing CSS styles for the Login component

const Login = () => {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Clear any previous error messages

    try {
      // Make a POST request to the login API with email and password
      const response = await axios.post('/api/auth/login', { email, password });
      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);
      // Navigate to the dashboard on successful login
      navigate('/dashboard');
    } catch (err) {
      // If there's an error, set an error message and log the error
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div className="login-container"> {/* Container for the login form */}
      <h1>Login</h1> {/* Login title */}
      <form onSubmit={handleLogin} className="login-form"> {/* Form for user login */}
        <div className="form-group"> {/* Group for email input */}
          <label htmlFor="email">Email:</label> {/* Email label */}
          <input
            type="email" // Input type for email
            id="email" // Unique ID for the email input
            value={email} // Controlled input value
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required // Make this field required
          />
        </div>
        <div className="form-group"> {/* Group for password input */}
          <label htmlFor="password">Password:</label> {/* Password label */}
          <input
            type="password" // Input type for password
            id="password" // Unique ID for the password input
            value={password} // Controlled input value
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required // Make this field required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
        <button type="submit" className="login-button"> {/* Submit button for the form */}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the application
