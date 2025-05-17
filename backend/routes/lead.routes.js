// External Modules
import express from 'express';

// Controllers
import { getLeaderboard } from '../controllers/lead.Controller.js';

// Middleware
import authMiddleware from '../middleware/authMiddleware.js';

// Initialize Express Router
const router = express.Router();

