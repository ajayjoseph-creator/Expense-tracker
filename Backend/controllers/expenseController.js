import Expense from '../models/expenseModel.js';

export const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = await Expense.create({
      amount,
      category,
      description,
      user: req.user._id, 
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }); 
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const summaryByCategory = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          descriptions: { $push: "$description" },
        },
      },
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
