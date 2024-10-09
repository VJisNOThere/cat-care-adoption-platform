import React, { createContext, useState, useEffect } from 'react';
import * as catService from '../services/catService';

// Create the CatContext using React's createContext
export const CatContext = createContext();

// CatProvider component to wrap around parts of the application that need cat data
export const CatProvider = ({ children }) => {
  // State to hold the list of cats
  const [cats, setCats] = useState([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState(null);

  // Load the list of cats when the component mounts
  useEffect(() => {
    const loadCats = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        // Fetch the list of cats from the service
        const catList = await catService.getAllCats();
        setCats(catList); // Update the cats state with the fetched list
      } catch (err) {
        // If there's an error, update the error state
        setError(err.message);
      } finally {
        // Set loading to false after the fetch is complete
        setIsLoading(false);
      }
    };

    loadCats(); // Call the function to load cats
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to add a new cat
  const addCat = async (newCatData) => {
    try {
      // Call the service to add a new cat
      const newCat = await catService.addCat(newCatData);
      // Update the cats state with the new cat
      setCats((prevCats) => [...prevCats, newCat]);
    } catch (err) {
      // If there's an error, update the error state and throw it
      setError(err.message);
      throw err;
    }
  };

  // Function to update an existing cat
  const updateCat = async (catId, updatedCatData) => {
    try {
      // Call the service to update the cat
      const updatedCat = await catService.updateCat(catId, updatedCatData);
      // Update the cats state with the updated cat
      setCats((prevCats) =>
        prevCats.map((cat) => (cat.id === catId ? updatedCat : cat))
      );
    } catch (err) {
      // If there's an error, update the error state and throw it
      setError(err.message);
      throw err;
    }
  };

  // Function to delete a cat
  const deleteCat = async (catId) => {
    try {
      // Call the service to delete the cat
      await catService.deleteCat(catId);
      // Update the cats state to remove the deleted cat
      setCats((prevCats) => prevCats.filter((cat) => cat.id !== catId));
    } catch (err) {
      // If there's an error, update the error state and throw it
      setError(err.message);
      throw err;
    }
  };

  // Context value containing the state and functions
  const value = {
    cats,
    isLoading,
    error,
    addCat,
    updateCat,
    deleteCat,
  };

  // Render the CatContext provider with the value
  return (
    <CatContext.Provider value={value}>
      {children} {/* Render children components */}
    </CatContext.Provider>
  );
};
