const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

// Get all appointments for user
router.get("/", auth, async (req, res) => {
  try {
    const query =
      req.user.role === "doctor"
        ? { doctorId: req.user.userId }
        : { patientId: req.user.userId };

    const appointments = await Appointment.find(query)
      .populate("patientId", "name email")
      .populate("doctorId", "name email")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create appointment
router.post("/", auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      patientId: req.user.userId,
    });
    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update appointment status
router.patch("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    res.json({ message: "Appointment updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete appointment
router.delete("/:id", auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
