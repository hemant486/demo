require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const fixDoctorsAvailability = async () => {
  try {
    // Find all doctors
    const allDoctors = await User.find({ role: "doctor" });

    // Filter doctors with empty or missing availability
    const doctors = allDoctors.filter((doc) => {
      if (!doc.availability) return true;
      // Check if it's a Map and if it's empty
      if (doc.availability instanceof Map) {
        return doc.availability.size === 0;
      }
      // Check if it's an object and if it's empty
      const availKeys = Object.keys(doc.availability).filter(
        (k) => !k.startsWith("$")
      );
      return availKeys.length === 0;
    });

    console.log(`Found ${doctors.length} doctors without availability`);

    const defaultAvailability = {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    };

    for (const doctor of doctors) {
      console.log(`\nUpdating doctor: ${doctor.name} (${doctor.email})`);

      await User.findByIdAndUpdate(doctor._id, {
        specialization: doctor.specialization || "General Practice",
        experience: doctor.experience || 0,
        consultationFee: doctor.consultationFee || 100,
        availability: defaultAvailability,
      });

      console.log(`✅ Updated ${doctor.name}`);
    }

    console.log("\n✅ All doctors updated successfully!");
    console.log("\nDefault availability set:");
    console.log("- Monday-Thursday: 9am-4pm");
    console.log("- Friday: 9am-3pm");
    console.log(
      "\nDoctors can customize their availability in Profile Settings"
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating doctors:", error);
    process.exit(1);
  }
};

// Run the fix
connectDB().then(fixDoctorsAvailability);
