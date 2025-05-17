import express from 'express'; 
import { addExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
