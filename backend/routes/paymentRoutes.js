const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Create a new payment (authenticated users only)
router.post('/', authMiddleware.verifyToken, paymentController.createPaymentIntent);

// Get all payments (admin only)
router.get('/', authMiddleware.verifyToken, roleMiddleware(['admin']), paymentController.getAllPayments);

// Get payment details by ID (authenticated users only)
router.get('/:id', authMiddleware.verifyToken, paymentController.getPaymentDetails);

// Stripe Webhook (admin only)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware(['admin']), paymentController.stripeWebhook);

// Delete a payment by ID (admin only)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware(['admin']), paymentController.deletePayment);

module.exports = router;
