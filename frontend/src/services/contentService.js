import api from './api'; // Import the API module for making requests

// Fetch all wellness content
export const getAllContent = async () => {
  const response = await api.get('/content'); // Make a GET request to fetch all content
  return response.data; // Return the data from the response
};

// Fetch a specific content by ID
export const getContentById = async (contentId) => {
  const response = await api.get(`/content/${contentId}`); // Make a GET request for content by ID
  return response.data; // Return the data from the response
};

// Add new wellness content (Admin only)
export const addContent = async (contentData) => {
  const response = await api.post('/content', contentData); // Make a POST request to add new content
  return response.data; // Return the data from the response
};

// Update existing wellness content (Admin only)
export const updateContent = async (contentId, contentData) => {
  const response = await api.put(`/content/${contentId}`, contentData); // Make a PUT request to update content by ID
  return response.data; // Return the data from the response
};

// Delete wellness content (Admin only)
export const deleteContent = async (contentId) => {
  const response = await api.delete(`/content/${contentId}`); // Make a DELETE request to remove content by ID
  return response.data; // Return the data from the response
};

// Add a comment to content
export const addComment = async (contentId, commentData) => {
  const response = await api.post(`/content/${contentId}/comments`, commentData); // Make a POST request to add a comment to specific content
  return response.data; // Return the data from the response
};

// Rate wellness content
export const rateContent = async (contentId, rating) => {
  const response = await api.patch(`/content/${contentId}/rate`, { rating }); // Make a PATCH request to rate specific content
  return response.data; // Return the data from the response
};
