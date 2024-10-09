// Import necessary modules and libraries
const generateToken = require('../utils/generateToken'); // Token generation utility
const User = require('../models/User'); // User model for database operations
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating JSON Web Tokens
require('dotenv').config(); // Load environment variables from .env file

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Destructure user data from request body

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' }); // Return error if user exists
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // Save the new user to the database
    await user.save();

    // Generate a JWT token for the new user
    const payload = {
      user: {
        id: user.id, // Include user ID in the payload
      },
    };

    // Sign the token with the secret and set an expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token back to the client
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message); // Log any errors to the console
    res.status(500).send('Server error'); // Return server error response
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from request body

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Return error if user does not exist
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Return error if passwords do not match
    }

    // Generate a JWT token for the user
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send user details and token back to the client
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token, // Send the token
    });
  } catch (error) {
    console.error(error.message); // Log any errors to the console
    res.status(500).send('Server error'); // Return server error response
  }
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
    // Get user by ID, excluding the password field from the response
    const user = await User.findById(req.user.id).select('-password');
    res.json(user); // Send user details back to the client
  } catch (error) {
    console.error(error.message); // Log any errors to the console
    res.status(500).send('Server error'); // Return server error response
  }
};

// Logout user
const logoutUser = (req, res) => {
  // Clear the token or remove it from a blacklist (implementation-specific)
  res.status(200).json({ message: 'User logged out successfully' }); // Send success message
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  logoutUser, // Ensure logoutUser is exported
};
