const User = require("../models/UserModel");

const updateUserOrCreateUser = async (req, res) => {
  try {
    const { uid, username, name, bio, onboarded } = req.body;

    // Check if a user with the same 'uid' already exists
    let existingUser = await User.findOne({ id: uid });

    if (existingUser) {
      // If the user exists, return their information without updating
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    } else {
      // If the user doesn't exist, create a new user and set 'onboarded' to true
      const newUser = new User({
        id: uid,
        username,
        name,
        bio,
        onboarded: true, // Set 'onboarded' to true
      });

      await newUser.save();

      // Respond with a success message and the newly created user
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error("Error creating/updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { uid } = req.params; // Retrieve 'uid' from the request parameters

    // Find the user by 'id' (assuming 'id' corresponds to the 'uid' in your schema)
    const user = await User.findOne({ id: uid });

    if (user) {
      // If the user is found, send their information
      res.status(200).json(user);
    } else {
      // If no user is found, send a 404 (Not Found) response
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateUserOrCreateUser,
  getUser,
};
