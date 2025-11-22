const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get all patients (for doctors)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "doctor" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const patients = await User.find({ role: "patient" }).select("-password");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
