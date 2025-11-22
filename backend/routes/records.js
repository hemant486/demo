const express = require("express");
const router = express.Router();
const MedicalRecord = require("../models/MedicalRecord");
const auth = require("../middleware/auth");

// Get medical records
router.get("/", auth, async (req, res) => {
  try {
    const query =
      req.user.role === "doctor" ? {} : { patientId: req.user.userId };

    const records = await MedicalRecord.find(query)
      .populate("patientId", "name email")
      .populate("doctorId", "name email")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create medical record
router.post("/", auth, async (req, res) => {
  try {
    const record = new MedicalRecord({
      ...req.body,
      doctorId: req.user.userId,
    });
    await record.save();
    res.status(201).json({ message: "Medical record created", record });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
