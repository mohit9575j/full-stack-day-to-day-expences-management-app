import express from 'express';
import { getLeaderboard } from '../controllers/lead.Controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; // middleware if needed

const router = express.Router();

// Only for Premium Users
router.get('/leaderboard', authMiddleware, getLeaderboard);

export default router;
