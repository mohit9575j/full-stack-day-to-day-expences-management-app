// Express Framework
import express from 'express';

// Controller Functions for Premium Features
import {
  createOrder,
  verifyPayment,
  webhook,
  getPremiumStatus,
} from '../controllers/premium.controller.js';

// Middleware for Authentication
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize Express Router Instance
const router = express.Router();

/**
 * @route   POST /create-order
 * @desc    Initiates a new premium subscription order
 * @access  Protected (Requires Authentication)
 */
router.post('/create-order', authMiddleware, createOrder);

/**
 * @route   POST /verify-payment
 * @desc    Verifies payment after transaction completion
 * @access  Protected (Requires Authentication)
 */
router.post('/verify-payment', authMiddleware, verifyPayment);

/**
 * @route   POST /webhook
 * @desc    Receives real-time payment status updates from Cashfree
 * @access  Public (Called by Cashfree, no auth required)
 */
router.post('/webhook', webhook);
