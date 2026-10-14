
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import Appointment, {
  DEPARTMENTS,
  PREFERRED_TIMES,
  isValidPreferredDate,
} from "./models/Appointment.js";

// DNS fix for MongoDB Atlas SRV lookup
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json({ limit: "10kb" }));

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CarePlus Hospital API",
    status: "running",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CarePlus backend is running!",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

app.post("/api/appointments", async (req, res) => {
  const body = req.body;
  const idempotencyKey = req.get("Idempotency-Key");
  const errors = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      success: false,
      message: "Submit appointment details as a JSON object.",
    });
  }

  const patientName =
    typeof body.patientName === "string" ? body.patientName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const department =
    typeof body.department === "string" ? body.department : "";
  const preferredDate =
    typeof body.preferredDate === "string" ? body.preferredDate : "";
  const preferredTime =
    typeof body.preferredTime === "string" ? body.preferredTime : "";

  if (!patientName || patientName.length > 100) {
    errors.patientName = "Enter a patient name up to 100 characters.";
  }

  const phoneDigits = phone.replace(/\D/g, "").length;
  if (
    !/^\+?[0-9(). -]+$/.test(phone) ||
    phoneDigits < 7 ||
    phoneDigits > 15
  ) {
    errors.phone = "Enter a valid phone number containing 7 to 15 digits.";
  }

  if (!DEPARTMENTS.includes(department)) {
    errors.department = "Select a valid department.";
  }

  if (!isValidPreferredDate(preferredDate)) {
    errors.preferredDate = "Choose a valid date that is not in the past.";
  }

  if (!PREFERRED_TIMES.includes(preferredTime)) {
    errors.preferredTime = "Select a valid preferred time.";
  }

  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(idempotencyKey || "")) {
    errors.request = "This request could not be verified. Refresh the page and try again.";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      message: "Please correct the appointment details and try again.",
      errors,
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Appointment requests are temporarily unavailable. Please try again later.",
    });
  }

  try {
    const existingRequest = await Appointment.findOne({
      idempotencyKey,
    }).select("_id");

    if (existingRequest) {
      return res.status(200).json({
        success: true,
        message: "Your appointment request was already received. The hospital will contact you to confirm availability.",
      });
    }

    await Appointment.create({
      patientName,
      phone,
      department,
      preferredDate,
      preferredTime,
      idempotencyKey,
    });

    return res.status(201).json({
      success: true,
      message: "Your appointment request was received. The hospital will contact you to confirm availability.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Your appointment request was already received. The hospital will contact you to confirm availability.",
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Please correct the appointment details and try again.",
      });
    }

    console.error("Appointment request could not be saved:", error.name);
    return res.status(mongoose.connection.readyState === 1 ? 500 : 503).json({
      success: false,
      message: mongoose.connection.readyState === 1
        ? "We could not save your appointment request. Please try again."
        : "Appointment requests are temporarily unavailable. Please try again later.",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "The request is too large.",
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Request body must contain valid JSON.",
    });
  }

  console.error("API request failed:", err.name || "Error");

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
function startServer() {
  app.listen(PORT, () => {
    console.log(`CarePlus backend running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing; database-backed requests are unavailable.");
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  }).then(() => {
    console.log("MongoDB Atlas connected successfully!");
  }).catch((error) => {
    console.error("MongoDB connection failed; database-backed requests are unavailable:", error.name);
  });
}

startServer();
