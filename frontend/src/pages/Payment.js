//Payment.js

const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  // Reference to the user making the payment
  user: {
    type: mongoose.Schema.Types.ObjectId, // User ID of the associated User document
    ref: 'User', // Reference to the User model
    required: true, // This field is required
  },
  // Amount of the payment
  amount: {
    type: Number, // Payment amount
    required: true, // This field is required
  },
  // Currency for the payment
  currency: {
    type: String, // Currency type (e.g., USD, EUR)
    default: 'USD', // Default value is 'USD'
  },
  // Payment method used (e.g., credit card, PayPal)
  paymentMethod: {
    type: String, // Payment method type
    required: true, // This field is required
  },
  // Status of the payment
  status: {
    type: String, // Status of the payment
    enum: ['pending', 'completed', 'failed'], // Allowed values for status
    default: 'pending', // Default value is 'pending'
  },
  // Unique transaction identifier
  transactionId: {
    type: String, // Transaction ID
    required: true, // This field is required
    unique: true, // This field must be unique across all Payment documents
  },
  // Date and time when the payment was created
  createdAt: {
    type: Date, // Date type
    default: Date.now, // Default value is the current date and time
  },
});

// Create the Payment model based on the payment schema
const Payment = mongoose.model('Payment', paymentSchema);

// Export the Payment model for use in other parts of the application
module.exports = Payment;
