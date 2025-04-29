import express from 'express';
import { addExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';

const router = express.Router();


export default router;