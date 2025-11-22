const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bloodPressure: String,
  heartRate: String,
  weight: String,
  height: String,
  allergies: [String],
  medications: [String],
  medicalHistory: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HealthInfo", healthInfoSchema);
