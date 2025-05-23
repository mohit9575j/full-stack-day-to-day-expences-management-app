import express from 'express'; 
import { addExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addExpense);

router.get('/all', authMiddleware, getAllExpenses);

router.delete('/delete/:id', authMiddleware, deleteExpense);
router.put('/update/:id', authMiddleware, updateExpense);

export default router;
