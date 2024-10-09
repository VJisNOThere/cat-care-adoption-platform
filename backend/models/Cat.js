// Import Mongoose library
const mongoose = require('mongoose');

// Define the Cat schema
const CatSchema = new mongoose.Schema({
  // Field for the cat's name
  name: {
    type: String, // The name must be a string
    required: true, // This field is required
  },
  // Field for the cat's breed
  breed: {
    type: String, // The breed must be a string
    required: true, // This field is required
  },
  // Field for the cat's age
  age: {
    type: Number, // The age must be a number
    required: true, // This field is required
  },
  // Field for the cat's status
  status: {
    type: String, // The status must be a string
    enum: ['Available', 'Adopted'], // Only allows these two values
    default: 'Available', // Default value is 'Available'
  },
  // Field for the cat's image URL
  image: {
    type: String, // The image URL must be a string
    required: true, // This field is required
  },
  // Field for the cat's description
  description: {
    type: String, // The description must be a string
    required: true, // This field is required
  },
});

// Export the Cat model based on the CatSchema
module.exports = mongoose.model('Cat', CatSchema);
