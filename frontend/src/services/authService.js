import api, { setAuthToken } from './api'; // Import API functions and setAuthToken method

// Key for storing the token in local storage
const TOKEN_KEY = 'authToken';

// Register a new user
export const register = async (userData) => {
  // Send a POST request to register a new user
  const response = await api.post('/auth/register', userData);
  
  // Save the token upon successful registration
  if (response.token) {
    setAuthToken(response.token); // Set the token in the authorization header
    localStorage.setItem(TOKEN_KEY, response.token); // Save the token in local storage
  }
  
  return response; // Return the response
};

// Log in an existing user
export const login = async (userData) => {
  // Send a POST request to log in the user
  const response = await api.post('/auth/login', userData);
  
  // Save the token upon successful login
  if (response.token) {
    setAuthToken(response.token); // Set the token in the authorization header
    localStorage.setItem(TOKEN_KEY, response.token); // Save the token in local storage
  }
  
  return response; // Return the response
};

// Log out the current user
export const logout = () => {
  // Remove token from headers and local storage
  setAuthToken(null); // Clear the token from the authorization header
  localStorage.removeItem(TOKEN_KEY); // Remove the token from local storage
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  // Retrieve the token from local storage
  const token = localStorage.getItem(TOKEN_KEY);
  
  // Return true if the token exists, otherwise false
  return token ? true : false;
};

// Get current user profile
export const getUserProfile = async () => {
  // Send a GET request to fetch the current user's profile
  const response = await api.get('/auth/profile');
  
  return response; // Return the response
};

// Load token from local storage and set authorization header if available
export const loadToken = () => {
  // Retrieve the token from local storage
  const token = localStorage.getItem(TOKEN_KEY);
  
  // If a token exists, set it in the authorization header
  if (token) {
    setAuthToken(token);
  }
};

// Initialize the auth service by loading the token on startup
loadToken();
