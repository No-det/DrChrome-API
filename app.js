const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");

// Setting up MongoDB
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://ajal:ajal123@nodebt.3krkl.mongodb.net/test";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("Connected to the server");
  },
  (err) => {
    console.log(err);
  }
);

// Creating server
const app = express();

//Sessions
app.use(
  session({
    secret: "damn 2021",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Require passport congigs
require("./configs/passport")(passport);

//Setting up other dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Setting path to static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use("/assets/css", express.static(path.join(__dirname, "/assets/css")));
// app.use("/assets/img", express.static(__dirname + "/assets/img"));

//Route paths go here
const authRoute = require("./routes/auth.routes");

//Route setting
// app.use("/api", apiRoute);
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.render("Home");
});

//404 erro handler
// app.use((req, res, next) => {
//   next(new Error(404));
// });

//Connecting to port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening to port ", port, " at http://localhost:" + port);
});
