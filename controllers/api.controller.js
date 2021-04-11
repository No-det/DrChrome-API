const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const jwt = require("jsonwebtoken");

const sortAppointments = (app1, app2) => {
  if (new Date(app1.time) < new Date(app2.time)) return -1;
  if (new Date(app1.time) > new Date(app2.time)) return 1;
  return 0;
};

const populateUserData = async (uid) => {
    let user = await User.findOne({ uid: uid });
    user = await user.save();
    return user;
}

const changeToken = (doc) => {
  const token = jwt.sign({ user: doc }, "damn 2021");
  return token;
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    if (updatedUser) {
      const token = changeToken(updatedUser);
      return res.status(200).send({ token: token, user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Pani paali moneee");
  }
};

exports.getUser = async (req, res) => {
  let user = await User.findOne({ uid: req.params.uid }).populate("appointments");
  return res.status(200).send(user);
};

exports.addAppointment = async (req, res) => {
  let pending = 0;
  User.findOne({ uid: req.params.uid }, async (err, user) => {
    if (user) {
      user.appointments.map((appointment) => {
        if (new Date(appointment.time) < new Date()) appointment.isDone = true;
      });
      await user.save();
      user.appointments.map((appointment) => {
        if (!appointment.isDone) pending += 1;
      });
      if (pending < 4) {
        let newAppointment = await Appointment.create({
          time: req.body.time,
          doctorID: req.body.doctorID,
          patientID: req.params.uid,
          reason: req.body.reason,
          symptoms: req.body.symptoms,
        });
        User.findOne({ uid: req.body.doctorID }, async (err, doctor) => {
          if (err) {
            console.error("User not Found: ", err);
            res.status(404).send(err);
          } else {
            doctor.appointments.push(newAppointment._id);
            doctor = await doctor.save();
          }
        });
        User.findOne({ uid: req.params.uid }, async (err, patient) => {
          if (err) {
            console.error("User not Found: ", err);
            res.status(404).send(err);
          } else {
            patient.appointments.push(newAppointment._id);
            patient = await patient.save();
          }
        });
        res.status(200).send("Appointment added");
      } else res.status(203).send("Max limit reached : 4 Appointments");
    }
  });
};

exports.getDoctors = async (req, res) => {
  const doctors = await User.find({ isDoctor: true });
  if (doctors) return res.status(200).send(doctors);
  return res.send(204).send("No doctors found");
};

exports.isDoctor = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: req.params.id },
      { isDoctor: req.body.isDoctor, firstTime: false },
      {
        new: true,
      }
    );
    if (updatedUser) return res.status(200).send(updatedUser);
    res.status(400).send("Pani paali moneee");
  } catch (error) {
    console.log(error);
    res.status(500).send("Pani paali moneee");
  }
};

exports.updateAppointment = async (req, res) => {
  let user = await User.findById({ _id: req.params.id });
  user.appointments.map((appointment) => {
    if (appointment.isProcessed)
      if (appointment.isAccepted) console.log("Processed - Accepted");
      else console.log("Processed - NotAccepted");
    else console.log("NotProcessed");
  });
  user.appointments.map((appointment) => {
    if (appointment._id.equals(req.body._id)) {
      appointment.isProcessed = req.body.isProcessed;
      appointment.isAccepted = req.body.isAccepted;
    }
  });
  user = await user.save();
  console.log("\nAfter updation \n");
  user.appointments.map((appointment) => {
    if (appointment.isProcessed)
      if (appointment.isAccepted) console.log("Processed - Accepted");
      else console.log("Processed - NotAccepted");
    else console.log("NotProcessed");
  });
  const token = changeToken(user);
  return res.status(200).send({ token: token });
};
