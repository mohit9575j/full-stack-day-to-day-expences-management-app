import express from 'express';
import { createOrder, verifyPayment, webhook, getPremiumStatus } from '../controllers/premium.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new premium subscription order
router.post('/create-order', authMiddleware, createOrder);

// Verify payment after user completes payment
router.post('/verify-payment', authMiddleware, verifyPayment);

// Webhook for payment status updates from Cashfree
router.post('/webhook', webhook);

// Check if user has premium status
router.get('/status', authMiddleware, getPremiumStatus);

export default router;