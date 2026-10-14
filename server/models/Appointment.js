import mongoose from "mongoose";

export const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Diagnostics",
  "Emergency Care",
];

export const PREFERRED_TIMES = ["morning", "afternoon", "evening"];

export function isValidPreferredDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  if (
    selectedDate.getFullYear() !== year ||
    selectedDate.getMonth() !== month - 1 ||
    selectedDate.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
}

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          const digits = value.replace(/\D/g, "").length;
          return /^\+?[0-9(). -]+$/.test(value) && digits >= 7 && digits <= 15;
        },
        message: "Enter a valid phone number containing 7 to 15 digits.",
      },
    },
    department: {
      type: String,
      required: true,
      enum: DEPARTMENTS,
    },
    preferredDate: {
      type: String,
      required: true,
      validate: {
        validator: isValidPreferredDate,
        message: "Choose a valid date that is not in the past.",
      },
    },
    preferredTime: {
      type: String,
      required: true,
      enum: PREFERRED_TIMES,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      match: /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Appointment", appointmentSchema);
