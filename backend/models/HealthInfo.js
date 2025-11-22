const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Daily Activity
  steps: {
    type: Number,
    default: 0,
  },
  activeTime: {
    type: Number,
    default: 0,
  },
  sleep: {
    type: Number,
    default: 0,
  },
  // Body Metrics
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  bloodPressure: String,
  heartRate: String,
  // Medical Information
  allergies: [String],
  medications: [String],
  medicalHistory: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HealthInfo", healthInfoSchema);
