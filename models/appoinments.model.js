const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  time: { type: Date, required: true },
  reason: { type: String },
  symptoms: { type: String },
  files: { type: String },
  status: { type: String, default: "pending" },
});

module.exports = AppointmentSchema;
