const express = require("express");
const {
  updateUserOrCreateUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello user");
});

// Route to update or create a user
router.post("/updateuser", updateUserOrCreateUser);

// Route to get user information
router.get("/getuser/:uid", getUser);

module.exports = router;
