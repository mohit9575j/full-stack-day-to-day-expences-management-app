 



import db from '../models/index.js';

const Expense = db.Expense;

// ✅ Add Expense
export const addExpense = async(req,res) => {
    const { amount, description, category } = req.body;

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    try {
        const UserId = req.user.id; // 🟢 Auth middleware se milega

        const newExpense = await Expense.create({
            amount,
            description,
            category,
            UserId   // ✅ Yahi sabse zaruri change
        });

        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Expenses (only for current user)
export const getAllExpenses = async(req,res) => {
    try {
        const UserId = req.user.id;

        const expenses = await Expense.findAll({
            where: { UserId } // ✅ Sirf usi user ke expenses
        });

        res.status(200).json({ expenses });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Expense (only if user owns it)
export const deleteExpense = async(req, res) => {
    const { id } = req.params;
    const UserId = req.user.id;

    try {
        const expense = await Expense.findOne({ where: { id, UserId } });

        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Expense (only if user owns it)
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    const UserId = req.user.id;

    try {
        const expense = await Expense.findOne({ where: { id, UserId } });

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
