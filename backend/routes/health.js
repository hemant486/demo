const express = require("express");
const router = express.Router();
const HealthInfo = require("../models/HealthInfo");
const auth = require("../middleware/auth");

// Get health info
router.get("/", auth, async (req, res) => {
  try {
    const healthInfo = await HealthInfo.findOne({ userId: req.user.userId });
    res.json(healthInfo || {});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create/Update health info
router.post("/", auth, async (req, res) => {
  try {
    const healthData = {
      ...req.body,
      userId: req.user.userId,
      lastUpdated: Date.now(),
    };

    const healthInfo = await HealthInfo.findOneAndUpdate(
      { userId: req.user.userId },
      healthData,
      { new: true, upsert: true }
    );

    res.json({ message: "Health information updated", healthInfo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
