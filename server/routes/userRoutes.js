const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { registerUser } = require("../controllers/userController");

// Register
router.post("/register", registerUser);

// Get users (with filter)
router.get("/", async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    let filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;