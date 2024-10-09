// contentRoutes.js

const express = require('express'); // Importing Express framework
const router = express.Router(); // Creating a new router object
const contentController = require('../controllers/contentController'); // Importing the content controller for handling requests
const authMiddleware = require('../middleware/authMiddleware'); // Importing authentication middleware
const roleMiddleware = require('../middleware/roleMiddleware'); // Importing role-based access control middleware

// Route to create new wellness content (protected route, admin only)
router.post('/', authMiddleware.verifyToken, roleMiddleware('admin'), contentController.addContent);

// Route to get all wellness content (public access)
router.get('/', contentController.getAllContent);

// Route to get a specific wellness content by ID (public access)
router.get('/:id', contentController.getContentById);

// Route to update a specific wellness content by ID (protected route, admin only)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware('admin'), contentController.editContent);

// Route to delete a specific wellness content by ID (protected route, admin only)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware('admin'), contentController.deleteContent);

// Exporting the router to be used in other parts of the application
module.exports = router;
