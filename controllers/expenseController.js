const Expense = require("../models/ExpenseModel");

// Add Expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date, userId } = req.body;

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Create a new expense record associated with the user
    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date,
      user: userId, // Associate the expense record with the user
    });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Expenses
exports.getExpenses = async (req, res) => {
  try {
    const { userId } = req.params; // Retrieve the user's ID from the URL parameters

    // Find all expense records associated with the user, sorted by createdAt in descending order
    const expenses = await Expense.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { userId, expenseId } = req.params; // Retrieve the user's ID and expense ID from the URL parameters

    // Use the Expense model to find and delete the expense record
    await Expense.findOneAndDelete({ _id: expenseId, user: userId });

    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
