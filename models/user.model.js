const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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
  isVerified: { type: Boolean },
});

module.exports = mongoose.model("user", UserSchema);
