// Payment.js

// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the Payment Schema
const paymentSchema = new mongoose.Schema({
  // Reference to the User model (user making the payment)
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for user reference
    ref: 'User', // Reference to the User model
    required: true, // This field is required
  },
  // Amount of the payment
  amount: {
    type: Number, // Amount should be a number
    required: true, // This field is required
  },
  // Currency for the payment
  currency: {
    type: String, // Currency should be a string
    default: 'USD', // Default currency is USD
  },
  // Method of payment
  paymentMethod: {
    type: String, // Payment method as a string
    enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'], // Allowed payment methods
    required: true, // This field is required
  },
  // Status of the payment
  status: {
    type: String, // Payment status as a string
    enum: ['Pending', 'Completed', 'Failed'], // Allowed status values
    default: 'Pending', // Default status is Pending
  },
  // Unique transaction identifier
  transactionId: {
    type: String, // Transaction ID as a string
    required: true, // This field is required
    unique: true, // Transaction ID must be unique
  },
  // Date the payment was created
  createdAt: {
    type: Date, // Created date as a Date object
    default: Date.now, // Default to the current date
  },
  // Date the payment was last updated
  updatedAt: {
    type: Date, // Updated date as a Date object
    default: Date.now, // Default to the current date
  },
});

// Middleware to update `updatedAt` field before saving the document
paymentSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Set updatedAt to the current date
  next(); // Proceed to the next middleware or save
});

// Exporting the Payment model for use in other parts of the application
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment; // Export the Payment model
