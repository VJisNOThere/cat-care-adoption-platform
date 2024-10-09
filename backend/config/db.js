// db.js

// Import Mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Load environment variables from a .env file
require('dotenv').config();

// Database connection function
const connectDB = async () => {
  try {
    // Fetch MongoDB URI from environment variables (.env file)
    const mongoURI = process.env.MONGO_URI;

    // Connect to MongoDB using the URI (no need for deprecated options)
    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected...'); // Log success message when connected
  } catch (error) {
    // If an error occurs during connection, log it
    console.error('Error connecting to MongoDB:', error.message);
    
    // Exit the application with a failure code (1) in case of a connection error
    process.exit(1);
  }
};

// Export the connection function for use in other parts of the application
module.exports = connectDB;
