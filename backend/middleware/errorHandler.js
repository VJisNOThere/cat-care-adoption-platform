// errorHandler.js

// Middleware function to handle errors in Express applications
const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 (Internal Server Error) if it is not explicitly set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Respond with a JSON object containing error details
  res.status(statusCode).json({
    // Send the error message
    message: err.message,
    // Include the stack trace only if the environment is not production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Export the errorHandler function for use in other modules
module.exports = errorHandler;
