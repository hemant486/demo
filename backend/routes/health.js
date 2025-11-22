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
    console.log("Received health data:", req.body);
    console.log("User ID:", req.user.userId);

    const healthData = {
      userId: req.user.userId,
      steps: req.body.steps || 0,
      activeTime: req.body.activeTime || 0,
      sleep: req.body.sleep || 0,
      weight: req.body.weight || null,
      height: req.body.height || null,
      bloodPressure: req.body.bloodPressure || "",
      heartRate: req.body.heartRate || "",
      allergies: req.body.allergies || [],
      medications: req.body.medications || [],
      medicalHistory: req.body.medicalHistory || "",
      lastUpdated: Date.now(),
    };

    const healthInfo = await HealthInfo.findOneAndUpdate(
      { userId: req.user.userId },
      healthData,
      { new: true, upsert: true, runValidators: true }
    );

    console.log("Health info saved:", healthInfo);
    res.json({ message: "Health information updated", healthInfo });
  } catch (error) {
    console.error("Error saving health info:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
