const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/error" }),
  (req, res) => {
    console.log("Sucessful");
    res.redirect("/auth/success");
  }
);

router.get("/success", (req, res) => {
  const token = jwt.sign(
    {
      user: req.user,
    },
    "damn 2021"
  );
  const auth = "Bearer " + token;
  res.header("Authoization", auth);
  //   res.status(200).send({ message: "Auth Success", user: req.user });
  res.redirect("http://localhost:3000?token=" + token);
});

router.get("/error", (req, res) => {
  console.error("Error");
  res.status(400).send("Error loggin in");
});

router.get("/user", (req, res, next) => {
  const token = req.headers["token"];
  if (!token) return res.status(401).json({ message: "Access Denied!" });
  try {
    const decoded = jwt.verify(token, "damn 2021");
    req.userData = decoded;
    res.status(200).json({ user: req.userData });
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
});

module.exports = router;
