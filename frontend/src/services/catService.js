import api from './api'; // Import the configured API instance

// Fetch all available cats
export const getAllCats = async () => {
  const response = await api.get('/cats'); // Send a GET request to retrieve all cats
  return response.data; // Return the data from the response
};

// Fetch a single cat by ID
export const getCatById = async (catId) => {
  const response = await api.get(`/cats/${catId}`); // Send a GET request to retrieve a cat by its ID
  return response.data; // Return the data from the response
};

// Search for cats based on filters
export const searchCats = async (filters) => {
  const response = await api.get('/cats', {
    params: filters, // Send a GET request with query parameters for filtering
  });
  return response.data; // Return the data from the response
};

// Add a new cat profile (Admin only)
export const addCat = async (catData) => {
  const response = await api.post('/cats', catData); // Send a POST request to add a new cat
  return response.data; // Return the data from the response
};

// Update an existing cat profile (Admin only)
export const updateCat = async (catId, catData) => {
  const response = await api.put(`/cats/${catId}`, catData); // Send a PUT request to update a cat by its ID
  return response.data; // Return the data from the response
};

// Delete a cat profile (Admin only)
export const deleteCat = async (catId) => {
  const response = await api.delete(`/cats/${catId}`); // Send a DELETE request to remove a cat by its ID
  return response.data; // Return the data from the response
};

// Update the adoption status of a cat
export const updateCatStatus = async (catId, status) => {
  const response = await api.patch(`/cats/${catId}/status`, { status }); // Send a PATCH request to update the cat's status
  return response.data; // Return the data from the response
};
