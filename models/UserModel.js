const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3, // Example: Minimum length validation
    maxlength: 30, // Example: Maximum length validation
  },
  name: {
    type: String,
    required: true,
  },
  
  bio: String,
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
