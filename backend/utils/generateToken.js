// Import the jsonwebtoken library to create and verify JSON Web Tokens
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user
 * @param {string} userId - The unique identifier for the user
 * @param {string} role - The role of the user (e.g., 'admin', 'user')
 * @returns {string} - The generated JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId, // Payload: User ID included in the token
      role: role   // Payload: User role included in the token
    },
    process.env.JWT_SECRET, // Secret key for signing the token (stored in environment variables)
    {
      expiresIn: '1d', // Set token expiration to 1 day
    }
  );
};

// Export the generateToken function for use in other files
module.exports = generateToken;
