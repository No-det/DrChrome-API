const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/auth.routes");

const sortAppointments = (app1, app2) => {
  if (new Date(app1.time) < new Date(app2.time)) return -1;
  if (new Date(app1.time) > new Date(app2.time)) return 1;
  return 0;
};

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
  let user = await User.findById({ _id: req.params.id });
  user.upcomingApps = [];
  user.appointments.map((appointment) => {
    if (new Date(appointment.time) < new Date()) {
      appointment.isDone = true;
    } else {
      appointment.isDone = false;
      user.upcomingApps.push(appointment);
    }
  });
  user.upcomingApps.sort(sortAppointments);
  user = await user.save();
  return res.status(200).send(user);
};

exports.addAppointment = async (req, res) => {
  let pending = 0;
  User.findById({ _id: req.params.id }, async (err, user) => {
    if (user) {
      user.appointments.map((appointment) => {
        if (new Date(appointment.time) < new Date()) appointment.isDone = true;
      });
      await user.save();
      user.appointments.map((appointment) => {
        if (!appointment.isDone) pending += 1;
      });
      let newAppointment = {
        time: req.body.time,
        doctorID: req.body.doctorID,
        patientID: req.params.id,
        reason: req.body.reason,
        symptoms: req.body.symptoms,
      };
      if (pending < 4) {
        User.findById({ _id: req.body.doctorID }, (err, doctor) => {
          if (err) {
            console.error("User not Found: ", err);
            res.status(404).send(err);
          } else {
            doctor.appointments.push(newAppointment);
            doctor.save((err, doctor) => {
              if (err) {
                console.error("Internal Server Error: ", err);
                res.status(500).send(err);
              } else {
                console.log("New Appoinment added to Doctor");
              }
            });
          }
        });
        User.findById({ _id: req.params.id }, (err, user) => {
          if (err) {
            console.error("User not Found: ", err);
            res.status(404).send(err);
          } else {
            user.appointments.push(newAppointment);
            user.save((err, user) => {
              if (err) {
                console.error("Internal Server Error: ", err);
                res.status(500).send(err);
              } else {
                console.log(
                  "New Appoinment added to Patient\n",
                  newAppointment
                );
                const token = changeToken(user);
                res.status(200).send(token);
              }
            });
          }
        });
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
  const user = await User.findById({ _id: req.params.id });
  user.appointments.map((appointment) => {
    if (appointment._id.equals(req.body._id))
      appointment = { ...appointment, ...req.body };
  });
  user = await user.save();
  const token = changeToken(user);
  return res.status(200).send({ token: token });
};
