// WellnessContent.js

// Importing mongoose to work with MongoDB
const mongoose = require('mongoose');

// Defining the Wellness Content Schema
const wellnessContentSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the content
    required: true, // Title is required
    trim: true, // Removes whitespace from both ends
  },
  type: {
    type: String, // Type of content (Article or Video)
    enum: ['Article', 'Video'], // Valid values for this field
    required: true, // Type is required
  },
  content: {
    type: String, // Actual content (text or link to video)
    required: true, // Content is required
    trim: true, // Removes whitespace from both ends
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Refers to the User collection
        required: true, // User ID is required for a comment
      },
      comment: {
        type: String, // The actual comment text
        required: true, // Comment text is required
        trim: true, // Removes whitespace from both ends
      },
      date: {
        type: Date, // Date when the comment was made
        default: Date.now, // Sets default to current date
      },
    },
  ],
  ratings: {
    type: Number, // Average rating of the content
    default: 0, // Default rating is 0
  },
  createdAt: {
    type: Date, // Date when the content was created
    default: Date.now, // Sets default to current date
  },
});

// Exporting the WellnessContent model for use in other parts of the application
const WellnessContent = mongoose.model('WellnessContent', wellnessContentSchema);
module.exports = WellnessContent;
