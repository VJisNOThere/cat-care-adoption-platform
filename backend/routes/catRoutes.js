// catRoutes.js

// Import the necessary modules
const express = require('express'); // Importing Express to create a router
const router = express.Router(); // Creating an instance of a router
const catController = require('../controllers/catController'); // Importing the cat controller for handling cat-related actions
const authMiddleware = require('../middleware/authMiddleware'); // Importing the authentication middleware

// Route to create a new cat profile (protected route)
// This route requires a valid token to create a cat profile
router.post('/', authMiddleware.verifyToken, catController.addCat); // Updated from createCat to addCat

// Route to get all cat profiles
// This route is public and does not require authentication
router.get('/', catController.getAllCats);

// Route to get a specific cat profile by its ID
// This route is public and does not require authentication
router.get('/:id', catController.getCatById);

// Route to update a specific cat profile by its ID (protected route)
// This route requires a valid token to update a cat profile
router.put('/:id', authMiddleware.verifyToken, catController.editCat);

// Route to delete a specific cat profile by its ID (protected route)
// This route requires a valid token to delete a cat profile
router.delete('/:id', authMiddleware.verifyToken, catController.deleteCat);

// Exporting the router so it can be used in other parts of the application
module.exports = router;
