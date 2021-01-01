const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller");

router.post("/addUser", apiController.addUser);
router.post("/appoinment/:id", apiController.addAppointment);

module.exports = router;
