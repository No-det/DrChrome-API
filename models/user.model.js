const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppoinmentSchema = new Schema({
  time: { type: Date, default: Date.now, required: true },
  doctorID: { type: String, required: true },
  patientID: { type: String, required: true },
  ans1: { type: String, required: true },
  ans2: { type: String, required: true }
});

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
  gender: { type: String },
  isVerified: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  appoinments: [AppoinmentSchema]
});

module.exports = mongoose.model("user", UserSchema);
