import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", userSchema);