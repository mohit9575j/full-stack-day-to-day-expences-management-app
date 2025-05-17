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
