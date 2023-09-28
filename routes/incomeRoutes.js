const express = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

// Route to add a new income record
router.post("/addincome", addIncome);

// Route to retrieve all income records for a user
router.get("/getincome/:userId", getIncomes); // Change the HTTP method to POST

// Route to delete an income record
router.delete("/deleteincome/:userId/:incomeId", deleteIncome);

module.exports = router;
