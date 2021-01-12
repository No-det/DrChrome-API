const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppSchema = require("./appointments.model");

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  googleID: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  image: { type: String },
  dob: { type: Date },
  blood: { type: String },
  phone: { type: Number },
  zip: { type: Number },
  city: { type: String },
  state: { type: String },
  specialization: { type: String },
  hospital: { type: String },
  pricing: { type: Number },
  yearsOfExp: { type: Number },
  slots: [{ type: Boolean }],
  gender: { type: String },
  isVerified: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  firstTime: { type: Boolean, default: true },
  appointments: [AppSchema],
});

module.exports = mongoose.model("user", UserSchema);
