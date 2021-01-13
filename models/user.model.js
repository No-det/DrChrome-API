const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppSchema = require("./appointments.model");

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  googleID: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  image: { type: String },
  dob: { type: Date },
  blood: { type: String, default: "NA" },
  phone: { type: Number, default: 0 },
  zip: { type: Number, default: 0 },
  city: { type: String, default: "NA" },
  state: { type: String, default: "NA" },
  specialization: { type: String, default: "NA" },
  hospital: { type: String, default: "NA" },
  pricing: { type: Number, default: 0 },
  yearsOfExp: { type: Number, default: 0 },
  slots: {
    "10:00 - 11:00": { type: Boolean, default: false },
    "11:00 - 12:00": { type: Boolean, default: false },
    "12:00 - 13:00": { type: Boolean, default: false },
    "13:00 - 14:00": { type: Boolean, default: false },
    "14:00 - 15:00": { type: Boolean, default: false },
    "15:00 - 16:00": { type: Boolean, default: false },
    "16:00 - 17:00": { type: Boolean, default: false },
  },
  gender: { type: String, default: "NA" },
  isVerified: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  inMeet : { type: Boolean, default: false },
  firstTime: { type: Boolean, default: true },
  appointments: [AppSchema],
});

module.exports = mongoose.model("user", UserSchema);
