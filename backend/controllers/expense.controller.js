import db from '../models/index.js';

const Expense  = db.Expense;

// Add expense
export const addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const newExpense = await Expense.create({
      amount,
      description,
      category,
    });

    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
