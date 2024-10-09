//Register.js

import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Rating.css'; // Import CSS styles for the component

const Register = () => {
  // State variables for form inputs and error handling
  const [name, setName] = useState(''); // State for the user's name
  const [email, setEmail] = useState(''); // State for the user's email
  const [password, setPassword] = useState(''); // State for the user's password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password
  const [error, setError] = useState(''); // State for handling error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Reset the error state before validation

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Set error message if passwords don't match
      return; // Exit the function
    }

    try {
      // Make a POST request to register the user
      await axios.post('/api/auth/register', { name, email, password });
      navigate('/login'); // Navigate to the login page on successful registration
    } catch (err) {
      // Handle any errors during registration
      setError('Registration failed. Please try again.'); // Set error message
      console.error(err); // Log the error to the console for debugging
    }
  };

  // Render the registration form
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        {/* Input field for the user's name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name} // Bind the input value to the name state
            onChange={(e) => setName(e.target.value)} // Update state on change
            required // Mark as required
          />
        </div>
        {/* Input field for the user's email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email} // Bind the input value to the email state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required // Mark as required
          />
        </div>
        {/* Input field for the user's password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password} // Bind the input value to the password state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required // Mark as required
          />
        </div>
        {/* Input field for confirming the password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword} // Bind the input value to the confirmPassword state
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
            required // Mark as required
          />
        </div>
        {/* Display error message if there is one */}
        {error && <p className="error-message">{error}</p>}
        {/* Submit button for the registration form */}
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register; // Export the Register component
