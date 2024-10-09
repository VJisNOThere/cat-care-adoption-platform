// authMiddleware.js

// Importing the required libraries and modules
const jwt = require('jsonwebtoken'); // Library for handling JSON Web Tokens
// const User = require('../models/User'); // This import is not used in this middleware

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Safely access the header

  // Check if the token exists
  if (!token) {
    // If no token, respond with a 401 Unauthorized status
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If valid, attach the decoded user information to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If verification fails, respond with a 401 Unauthorized status
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Exporting the middleware function for use in other files
module.exports = { verifyToken };
