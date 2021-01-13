const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctorID: { type: String, required: true, default: "NA" },
  patientID: { type: String, required: true, default: "NA" },
  time: { type: Date, required: true, default: new Date() },
  reason: { type: String, default: "NA" },
  symptoms: { type: String, default: "NA" },
  files: { type: String, default: "NA" },
  status: { type: String, default: "pending" },
  isDone: { type: Boolean, default: false },
  isProcessed: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false },
});

module.exports = AppointmentSchema;
