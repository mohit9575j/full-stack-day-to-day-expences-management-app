import db from '../models/index.js';

const Expense  = db.Expense;


/**
 * Adds a new expense for the logged-in user.
 * Validates that the category is provided.
 * The expense is linked to the authenticated user.
 */
export const addExpense = async (req, res) => {
    const { amount, description, category } = req.body;

    // Validate category
    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    try {
        const UserId = req.user.id; // Retrieved from auth middleware

        const newExpense = await Expense.create({
            amount,
            description,
            category,
            UserId // Links expense to the user
        });

        res.status(201).json({
            message: 'Expense added successfully',
            expense: newExpense
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.destroy();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.category = category || expense.category;

    await expense.save();

    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 
