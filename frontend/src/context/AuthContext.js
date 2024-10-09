import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; // Import authentication service functions

// Create the AuthContext to manage authentication state
export const AuthContext = createContext();

// AuthProvider component to wrap around parts of the application that need authentication
export const AuthProvider = ({ children }) => {
  // State to store the current user and loading status
  const [user, setUser] = useState(null); // Holds the authenticated user
  const [isLoading, setIsLoading] = useState(true); // Indicates if user data is being loaded

  // Load the authenticated user when the app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Fetch the currently authenticated user
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser); // Set the user state with the current user
      } catch (error) {
        console.error('Failed to load user', error); // Log error if user loading fails
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    loadUser(); // Call the loadUser function
  }, []); // Empty dependency array means this effect runs once on mount

  // Login function to authenticate the user
  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials); // Authenticate with provided credentials
      setUser(user); // Update user state
      return user; // Return the authenticated user
    } catch (error) {
      console.error('Login failed', error); // Log error if login fails
      throw error; // Rethrow the error for handling in the calling component
    }
  };

  // Logout function to remove the authenticated user
  const logout = async () => {
    try {
      await authService.logout(); // Call logout service
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Logout failed', error); // Log error if logout fails
    }
  };

  // Register function to create a new user
  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData); // Register new user with provided data
      setUser(newUser); // Update user state with new user
      return newUser; // Return the new user
    } catch (error) {
      console.error('Registration failed', error); // Log error if registration fails
      throw error; // Rethrow the error for handling in the calling component
    }
  };

  // Context value to provide authentication data and functions
  const value = {
    user, // Current authenticated user
    isLoading, // Loading status
    login, // Login function
    logout, // Logout function
    register, // Registration function
    isAuthenticated: !!user, // Boolean indicating if the user is authenticated
  };

  // Render the AuthContext provider, only after loading is complete
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children} {/* Render children only if not loading */}
    </AuthContext.Provider>
  );
};
