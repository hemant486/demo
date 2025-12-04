require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const doctors = await User.find({ role: "doctor" });
  console.log("Total doctors:", doctors.length);
  console.log("\nDoctors:");
  doctors.forEach((doc) => {
    console.log("\n---");
    console.log("Name:", doc.name);
    console.log("Email:", doc.email);
    console.log("Specialization:", doc.specialization);
    console.log("Has availability:", !!doc.availability);
    if (doc.availability) {
      console.log("Monday slots:", doc.availability.monday || "none");
    }
  });
  process.exit(0);
});
