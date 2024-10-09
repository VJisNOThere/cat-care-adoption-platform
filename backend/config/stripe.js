// stripe.js

// Import the Stripe library to handle payment processing
const Stripe = require('stripe');

// Initialize Stripe with the secret key from environment variables
// This key is used to authenticate requests to the Stripe API
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Export the initialized Stripe instance so it can be used in other modules
module.exports = stripe;
