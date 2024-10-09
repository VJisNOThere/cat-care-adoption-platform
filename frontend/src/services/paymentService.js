import api from './api'; // Import the API module for making HTTP requests

// Make a payment (donation or adoption fee)
export const makePayment = async (paymentData) => {
  // Send a POST request to the '/payments' endpoint with the payment data
  const response = await api.post('/payments', paymentData);
  // Return the response data (the result of the payment operation)
  return response.data;
};

// Fetch payment history for the user
export const getUserPaymentHistory = async () => {
  // Send a GET request to the '/payments/history' endpoint to retrieve user payment history
  const response = await api.get('/payments/history');
  // Return the response data containing the user's payment history
  return response.data;
};

// Fetch payment history for admins
export const getAdminPaymentHistory = async () => {
  // Send a GET request to the '/payments/admin/history' endpoint to retrieve admin payment history
  const response = await api.get('/payments/admin/history');
  // Return the response data containing the admin's payment history
  return response.data;
};
