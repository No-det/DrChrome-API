const User = require("../models/user.model");

exports.addUser = async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    {
      new: true,
    }
  );
  if (updatedUser) return res.status(200).send(updatedUser);
  res.status(400).send("Pani paali moneee");
};

exports.addAppointment = async (req, res) => {
  let newAppointment = {
    time: req.body.time,
    doctorID: req.body.doctorID,
    patientID: req.params.id,
    reason: req.body.reason,
    symptoms: req.body.symptoms
  }
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
          console.log("New Appoinment added to Patient\n", newAppointment);
          res.status(200).send(user);
        }
      });
    }
  });
};
