// External Modules
import express from 'express';

// Controllers
import { getLeaderboard } from '../controllers/lead.Controller.js';

// Middleware
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize Express Router
const router = express.Router();

/**
 * @route   GET /leaderboard
 * @desc    Returns leaderboard data (accessible to premium users only)
 * @access  Protected (Requires Authentication)
 */
router.get('/leaderboard', authMiddleware, getLeaderboard);

// Export the router to be used in main application
export default router;
