const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: String,
  prescription: [String],
  notes: String,
  attachments: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
