const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

// Route to add a new expense record
router.post("/addexpense", addExpense);

// Route to retrieve all expense records for a user
router.get("/getexpense/:userId", getExpenses); // Change the HTTP method to POST

// Route to delete an expense record
router.delete("/deleteexpense/:userId/:expenseId", deleteExpense);

module.exports = router;
