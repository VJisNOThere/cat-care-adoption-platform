// catController.js

// Import the Cat model to interact with the cat database
const Cat = require('../models/Cat'); 

// Add a new cat profile
const addCat = async (req, res) => {
  // Destructure the request body to get cat details
  const { name, breed, age, status, image } = req.body;

  try {
    // Create a new cat instance with the provided details
    const cat = new Cat({
      name,
      breed,
      age,
      status,
      image,
    });

    // Save the cat instance to the database
    await cat.save();

    // Respond with a success message and the created cat profile
    res.status(201).json({ message: 'Cat profile created successfully', cat });
  } catch (error) {
    // Log the error message to the console
    console.error(error.message);
    // Respond with a server error status
    res.status(500).send('Server error');
  }
};

// Edit an existing cat profile
const editCat = async (req, res) => {
  // Get the cat ID from the request parameters
  const { id } = req.params;
  // Destructure the request body to get updated cat details
  const { name, breed, age, status, image } = req.body;

  try {
    // Find the cat by ID and update its details
    const cat = await Cat.findByIdAndUpdate(
      id,
      { name, breed, age, status, image },
      { new: true } // Return the updated cat profile
    );

    // If no cat is found, respond with a not found message
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    // Respond with a success message and the updated cat profile
    res.json({ message: 'Cat profile updated successfully', cat });
  } catch (error) {
    // Log the error message to the console
    console.error(error.message);
    // Respond with a server error status
    res.status(500).send('Server error');
  }
};

// Delete a cat profile
const deleteCat = async (req, res) => {
  // Get the cat ID from the request parameters
  const { id } = req.params;

  try {
    // Find the cat by ID and delete it from the database
    const cat = await Cat.findByIdAndDelete(id);

    // If no cat is found, respond with a not found message
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    // Respond with a success message indicating deletion
    res.json({ message: 'Cat profile deleted successfully' });
  } catch (error) {
    // Log the error message to the console
    console.error(error.message);
    // Respond with a server error status
    res.status(500).send('Server error');
  }
};

// Get all cat profiles
const getAllCats = async (req, res) => {
  try {
    // Find all cats in the database and return them
    const cats = await Cat.find();
    res.json(cats); // Respond with the list of cats
  } catch (error) {
    // Log the error message to the console
    console.error(error.message);
    // Respond with a server error status
    res.status(500).send('Server error');
  }
};

// Get a specific cat profile by ID
const getCatById = async (req, res) => {
  // Get the cat ID from the request parameters
  const { id } = req.params;

  try {
    // Find the cat by ID and return it
    const cat = await Cat.findById(id);

    // If no cat is found, respond with a not found message
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    // Respond with the found cat profile
    res.json(cat);
  } catch (error) {
    // Log the error message to the console
    console.error(error.message);
    // Respond with a server error status
    res.status(500).send('Server error');
  }
};

// Export the controller functions for use in routes
module.exports = {
  addCat,
  editCat,
  deleteCat,
  getAllCats,
  getCatById,
};
