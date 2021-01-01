const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppSchema = require("./appoinments.model");

const DocSchema = new Schema({
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
  appointments: [AppSchema],
});

module.exports = mongoose.model("doc", DocSchema);
