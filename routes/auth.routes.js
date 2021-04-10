const express = require("express");
const passport = require("passport");
const router = express.Router();
// const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

let serviceAccount = require("../configs/serviceAccountKey.json");
const checkAuth = require("../middleware/checkAuth");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const sortAppointments = (app1, app2) => {
  if (new Date(app1.time) < new Date(app2.time)) return -1;
  if (new Date(app1.time) > new Date(app2.time)) return 1;
  return 0;
};

router.get("/user", (req, res) => {
  // const token = req.headers["token"];
  // if (!token) return res.status(401).json({ message: "Access Denied!" });
  // try {
  //   const decoded = jwt.verify(token, "damn 2021");
  //   req.userData = decoded;
  //   res.status(200).send({ user: req.userData });
  //   next();
  // } catch (error) {
  //   res.status(400).send({ message: "Invalid Token!" });
  // }
  const uid = req.headers["uid"];
  if (!uid) return res.status(401).json({ message: "Access Denied!" });
  User.findOne({ uid: uid })
    .then((user) => {
      if (user) {
        req.userData = user;
        res.status(200).send({ user: req.userData });
      } else res.status(400).send({ message: "User not found!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Some error occured! Try again later!" });
    });
});

router.post("/add-user", async (req, res) => {
  const newUser = req.body;
  try {
    let user = await User.findOne({ uid: newUser.uid });
    if (user) {
      res.status(400).send({ message: "User already exists!" });
    } else {
      user = await User.create(newUser);
      res.status(200).send({ success: true, user: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Some error occured. Try again later." });
  }
});

module.exports = router;
