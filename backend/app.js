// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const catRoutes = require('./routes/catRoutes');
const contentRoutes = require('./routes/contentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
console.log("Attempting to connect to MongoDB...");
connectDB();

// Initialize the Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Use Morgan for logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Cat Care and Adoption Platform API!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(errorHandler);

// Set up the port from .env or use a default
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
