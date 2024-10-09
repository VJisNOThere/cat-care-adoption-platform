import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
  // Base URL for the API, defaults to localhost if not set in the environment variables
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json', // Set the content type for requests
  },
});

// Set up the Authorization token for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    // If a token is provided, set it in the Authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If no token is provided, delete the Authorization header
    delete api.defaults.headers.common['Authorization'];
  }
};

// User Authentication Functions

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData); // Send POST request to register
  return response.data; // Return the response data
};

// Log in an existing user
export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData); // Send POST request to log in
  return response.data; // Return the response data
};

// Get the authenticated user's profile
export const getUserProfile = async () => {
  const response = await api.get('/auth/profile'); // Send GET request to fetch user profile
  return response.data; // Return the response data
};

// Cat Management Functions

// Fetch all cats, optionally applying filters
export const getAllCats = async (filters = {}) => {
  const response = await api.get('/cats', { params: filters }); // Send GET request with optional filters
  return response.data; // Return the response data
};

// Fetch a specific cat by its ID
export const getCatById = async (catId) => {
  const response = await api.get(`/cats/${catId}`); // Send GET request to fetch cat by ID
  return response.data; // Return the response data
};

// Add a new cat
export const addCat = async (catData) => {
  const response = await api.post('/cats', catData); // Send POST request to add a new cat
  return response.data; // Return the response data
};

// Update an existing cat
export const updateCat = async (catId, catData) => {
  const response = await api.put(`/cats/${catId}`, catData); // Send PUT request to update the cat
  return response.data; // Return the response data
};

// Delete a cat by its ID
export const deleteCat = async (catId) => {
  const response = await api.delete(`/cats/${catId}`); // Send DELETE request to remove the cat
  return response.data; // Return the response data
};

// Wellness Content Functions

// Fetch wellness content
export const getWellnessContent = async () => {
  const response = await api.get('/content'); // Send GET request to fetch wellness content
  return response.data; // Return the response data
};

// Fetch specific wellness content by ID
export const getContentById = async (contentId) => {
  const response = await api.get(`/content/${contentId}`); // Send GET request to fetch content by ID
  return response.data; // Return the response data
};

// Add new wellness content
export const addContent = async (contentData) => {
  const response = await api.post('/content', contentData); // Send POST request to add new content
  return response.data; // Return the response data
};

// Update existing wellness content
export const updateContent = async (contentId, contentData) => {
  const response = await api.put(`/content/${contentId}`, contentData); // Send PUT request to update content
  return response.data; // Return the response data
};

// Delete wellness content by ID
export const deleteContent = async (contentId) => {
  const response = await api.delete(`/content/${contentId}`); // Send DELETE request to remove content
  return response.data; // Return the response data
};

// Payments Functions

// Make a payment
export const makePayment = async (paymentData) => {
  const response = await api.post('/payments', paymentData); // Send POST request to process payment
  return response.data; // Return the response data
};

// Fetch payment history for the user
export const getPaymentHistory = async () => {
  const response = await api.get('/payments/history'); // Send GET request to fetch payment history
  return response.data; // Return the response data
};

// Export the axios instance for use in other parts of the application
export default api;
