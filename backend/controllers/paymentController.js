// Import Stripe and the Payment model
const stripe = require('../config/stripe'); 
const Payment = require('../models/Payment'); 

// Create a payment intent
const createPaymentIntent = async (req, res) => {
  const { amount, currency, description } = req.body;

  try {
    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method_types: ['card'], 
    });

    // Send back the client secret and payment intent ID
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

// Confirm payment based on the webhook
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']; 
  let event;

  try {
    // Verify the event from Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // Update the payment record
      await Payment.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: 'Completed', paymentDetails: paymentIntent }
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error.message);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
};

// Get payment details by ID
const getPaymentDetails = async (req, res) => {
  const { id } = req.params; 

  try {
    // Fetch the payment details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.json(paymentIntent);
  } catch (error) {
    console.error('Error getting payment details:', error.message);
    res.status(500).json({ error: 'Failed to get payment details' });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Exporting all controller functions
module.exports = {
  createPaymentIntent,
  stripeWebhook,
  getPaymentDetails,
  getAllPayments,
  deletePayment,
};
