// roleMiddleware.js

// Middleware to check if the user has one of the required roles
const roles = (...requiredRoles) => {
  // Return a middleware function
  return (req, res, next) => {
    // Check if the user is authenticated by verifying the req.user object
    if (!req.user) {
      // If not authenticated, send a 401 Unauthorized response with an error message
      return res.status(401).json({ error: 'Not authenticated. Please log in.' });
    }

    // Check if the user's role is included in the list of required roles
    if (!requiredRoles.includes(req.user.role)) {
      // If the user's role is not allowed, send a 403 Forbidden response with an error message
      return res.status(403).json({ error: 'Access denied. You do not have the required permissions.' });
    }

    // If the user is authenticated and has the required role, proceed to the next middleware or route handler
    next();
  };
};

// Export the roles middleware function for use in other parts of the application
module.exports = roles;
