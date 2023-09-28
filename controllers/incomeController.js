const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { userId, title, amount, category, description, date } = req.body;

  try {
    // Validations
    if (!userId || !title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Create a new income record associated with the user's UID
    const income = new Income({
      user: userId, // Associate the income record with the user's UID
      title,
      amount,
      category,
      description,
      date,
    });

    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const { userId } = req.params; // Retrieve the user's UID from the URL parameters

    // Find all income records associated with the user UID, sorted by createdAt in descending order
    const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error retrieving incomes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { userId, incomeId } = req.params; // Retrieve the user's ID and income ID from the URL parameters

    // Use the Income model to find and delete the income record
    await Income.findOneAndDelete({ _id: incomeId, user: userId });

    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
