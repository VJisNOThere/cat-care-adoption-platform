// User.js

// Importing necessary libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining the User Schema
const userSchema = new mongoose.Schema({
  // Email field, required, must be unique, trimmed, and lowercase
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  // Password field, required
  password: {
    type: String,
    required: true,
  },
  // Role field, can be either 'Admin' or 'Adopter', defaults to 'Adopter'
  role: {
    type: String,
    enum: ['Admin', 'Adopter'],
    default: 'Adopter',
  },
  // Name field, required and trimmed
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // CreatedAt field, defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving the user
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method to verify if the provided password matches the hashed password
userSchema.methods.isPasswordMatch = async function (password) {
  // Compare the given password with the hashed password
  return await bcrypt.compare(password, this.password);
};

// Exporting the User model for use in other parts of the application
const User = mongoose.model('User', userSchema);
module.exports = User;
