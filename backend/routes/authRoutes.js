// Import the necessary modules
const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const authController = require('../controllers/authController'); // Import the authentication controller
const { verifyToken } = require('../middleware/authMiddleware'); // Correctly import the middleware

// User registration route
// This route handles user registration requests
router.post('/register', authController.registerUser);

// User login route
// This route handles user login requests
router.post('/login', authController.loginUser);

// Get current user details (protected route)
// This route retrieves details of the logged-in user and requires a valid token
router.get('/me', verifyToken, authController.getUserDetails); // Use verifyToken directly

// Logout route
// This route handles user logout requests and requires a valid token
router.post('/logout', verifyToken, authController.logoutUser); // Use verifyToken directly

// Export the router so it can be used in other files
module.exports = router;
